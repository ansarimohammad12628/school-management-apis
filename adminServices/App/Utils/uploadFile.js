const fs = require('fs');
const axios = require('axios');
require('dotenv').config();

const IMAGE_USERNAME = process.env.IMAGE_USERNAME;
const IMAGE_REPO = process.env.IMAGE_REPO;
const IMAGE_TOKEN = process.env.IMAGE_TOKEN;
const IMAGE_BRANCH = process.env.IMAGE_BRANCH;
const BASE_IMAGE_REPO = process.env.BASE_IMAGE_REPO;


// 📤 Upload file to Server (optional reusable upload)
const uploadFileToServer = async ({
    file,
    folder = '',
    subfolder = '',
    commitMessage,
    customFileName,
    fileExtension,
}) => {
    if (!file || !file.path || !file.originalname) {
        return {
            success: false,
            status: 400,
            error: 'File is missing',
        };
    }

    const extension = fileExtension || file.originalname.split('.').pop();
    const filename = `${customFileName}.${extension}`;
    const filePath = `${folder}/${subfolder}/${filename}`;
    const fileContent = fs.readFileSync(file.path, { encoding: 'base64' });

    const image_url = `https://api.github.com/repos/${IMAGE_USERNAME}/${IMAGE_REPO}/contents/${filePath}`;

    let sha = null;
    try {
        const getRes = await axios.get(image_url, {
            headers: { Authorization: `token ${IMAGE_TOKEN}` },
        });
        sha = getRes.data.sha;
    } catch (err) {
        if (err.response?.status !== 404) throw err;
    }

    const putRes = await axios.put(
        image_url,
        {
            message: commitMessage || `Upload ${filename}`,
            content: fileContent,
            branch: IMAGE_BRANCH,
            ...(sha && { sha }),
        },
        {
            headers: {
                Authorization: `token ${IMAGE_TOKEN}`,
                Accept: 'application/vnd.github.v3+json',
            },
        }
    );

    try {
        fs.unlinkSync(file.path);
    } catch (e) {
        console.warn('Failed to delete temp file:', e.message);
    }

    return {
        success: true,
        data: {
            fileName: filename,
            download_url: putRes.data.content.download_url,
            sha: putRes.data.content.sha,
        },
    };
};

// 🗑️ Delete file from Server by SHA
const deleteFileFromServer = async ({ relativePath }) => {
    try {
        if (!relativePath) {
            return {
                success: false,
                message: "relativePath is required",
            };
        }

        // Step 1: Get file metadata to find SHA
        const fileMetadataUrl = `https://api.github.com/repos/${IMAGE_USERNAME}/${IMAGE_REPO}/contents/${relativePath}?ref=${IMAGE_BRANCH}`;

        const fileMetadataResponse = await axios.get(fileMetadataUrl, {
            headers: {
                Authorization: `Bearer ${IMAGE_TOKEN}`,
                Accept: "application/vnd.github.v3+json",
            },
        });

        const sha = fileMetadataResponse.data.sha;

        // Step 2: Delete the file
        const deleteResponse = await axios.delete(
            `https://api.github.com/repos/${IMAGE_USERNAME}/${IMAGE_REPO}/contents/${relativePath}`,
            {
                headers: {
                    Authorization: `Bearer ${IMAGE_TOKEN}`,
                    Accept: "application/vnd.github.v3+json",
                },
                data: {
                    message: `Delete file at path: ${relativePath}`,
                    sha,
                    branch: IMAGE_BRANCH,
                },
            }
        );

        return {
            success: true,
            message: `File deleted successfully from path: ${relativePath}`,
            filePath: relativePath,
        };
    } catch (error) {
        console.error("GitHub Delete Error:", error.message);
        return {
            success: false,
            message: "Failed to delete file from Server",
            error: error.message,
        };
    }
};



/**
 * Construct a Server raw content URL
 */
const getServerRawUrl = (relativePath, repo = BASE_IMAGE_REPO, branch = IMAGE_BRANCH) => {
    if (!relativePath) return null;
    return `https://raw.githubusercontent.com/${repo}/${branch}/${relativePath}`;
};

/**
 * Fetch file stream from Server
 */
const fetchServerFileStream = async (fileUrl) => {
    if (!fileUrl) {
        return {
            success: false,
            status: 400,
            error: "Server URL is required",
        };
    }

    try {
        const response = await axios.get(fileUrl, {
            headers: {
                Authorization: `token ${IMAGE_TOKEN}`,
            },
            responseType: "stream",
        });

        return {
            success: true,
            contentType: response.headers["content-type"],
            stream: response.data,
        };
    } catch (error) {
        console.error("Server Fetch Error:", error.message);
        return {
            success: false,
            status: error.response?.status || 500,
            error: "Failed to fetch file from Server",
        };
    }
};

module.exports = {
    uploadFileToServer,
    deleteFileFromServer,
    getServerRawUrl,
    fetchServerFileStream,
};