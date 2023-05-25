import axios from "axios";

const API_URL = "https://escrow-service-app.vercel.app/api/v1";
const FOLDER_NAME = "anonimos-brain";

const getToken = () => {
  return new Promise((resolve, reject) => {
    const userToken = localStorage.getItem("vrhealms");
    const TOKEN = userToken ? JSON.parse(userToken).token : null;
    resolve(TOKEN);
  });
};

const getHeaders = async () => {
  try {
    const token = await getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    return headers;
  } catch (error) {
    console.error(`Error getting headers: ${error}`);
    throw error;
  }
};

export const get = async (endpoint, params = {}) => {
  try {
    const headers = await getHeaders();
    const response = await axios.get(`${API_URL}/${endpoint}`, {
      params,
      headers,
    });
    return response.data;
  } catch (error) {
    console.error(`GET ${API_URL}/${endpoint} failed: ${error}`);
    throw error;
  }
};

export const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "ml_default");

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${FOLDER_NAME}/image/upload`,
      formData
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const uploadAudioCloudinary = async (audio) => {
  const formData = new FormData();
  formData.append("file", audio);
  formData.append("upload_preset", "ml_default");

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${FOLDER_NAME}/video/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: {
          resource_type: "audio",
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const post = async (endpoint, body = {}, params = {}) => {
  try {
    const headers = await getHeaders();
    const response = await axios.post(`${API_URL}/${endpoint}`, body, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZXhtcGxlIG1lIiwidXNlcklkIjoiNjQyYTI5MjAxYzdkOWRlNDVmN2EwYzFlIiwicGhvbmVOdW1iZXIiOiIwODA1MjIyMjU1NiIsImlhdCI6MTY4MjMyODAzNywiZXhwIjoxNjg0OTIwMDM3fQ.ltwSG7_lt84XBzW31bOXURhZWMaMJ0jWqVrwFbw_UPQ`,
      },
      params
    });
    return response.data;
  } catch (error) {
    console.error(`POST ${API_URL}/${endpoint} failed: ${error}`);
    throw error;
  }
};

export const put = async (endpoint, params = {}, body = {}) => {
  try {
    const headers = await getHeaders();
    const response = await axios.put(`${API_URL}/${endpoint}`, body, {
      params,
      headers,
    });
    return response.data;
  } catch (error) {
    console.error(`PUT ${API_URL}/${endpoint} failed: ${error}`);
    throw error;
  }
};

export const remove = async (endpoint, data = {}) => {
  try {
    const headers = await getHeaders();
    const response = await axios.delete(`${API_URL}/${endpoint}`, {
      data,
      headers,
    });
    return response.data;
  } catch (error) {
    console.error(`DELETE ${API_URL}/${endpoint} failed: ${error}`);
    throw error;
  }
};

// export const deleteImage = async (publicId) => {
//   const apiKey = process.env.REACT_APP_CLOUDINARY_API_KEY;
//   const apiSecret = process.env.REACT_APP_CLOUDINARY_API_SECRET;
//   const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
//   const timestamp = Math.floor(Date.now() / 1000);
//   const signature = generateSignature(publicId, apiKey, apiSecret, timestamp);

//   const queryParams = {
//     timestamp: timestamp,
//     signature: signature.signature,
//     api_key: apiKey,
//   };

//   try {
//     const response = await axios.post(
//       `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
//       {
//         public_id: publicId,
//       },
//       {
//         params: queryParams,
//       }
//     );
//     return response;
//   } catch (error) {
//     console.error(`Error deleting image: ${error}`);
//     return false;
//   }
// };

// function generateSignature(publicId, apiKey, apiSecret, timestamp) {
//   const data = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
//   const signature = sha1(data);

//   return {
//     timestamp: timestamp,
//     signature: signature,
//     api_key: apiKey,
//   };
// }

// export const deleteAudio = async (publicId) => {
//   const apiKey = process.env.REACT_APP_CLOUDINARY_API_KEY;
//   const apiSecret = process.env.REACT_APP_CLOUDINARY_API_SECRET;
//   const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
//   const timestamp = Math.floor(Date.now() / 1000);
//   const signature = generateSignature(publicId, apiKey, apiSecret, timestamp);

//   const queryParams = {
//     signature: signature,
//   };

//   try {
//     const response = await axios.delete(
//       `https://api.cloudinary.com/v1_1/${cloudName}/video/destroy/${publicId}?timestamp=${timestamp}`,
//       {
//         params: queryParams,
//       }
//     );
//     return response;
//   } catch (error) {
//     console.error(`Error deleting audio: ${error}`);
//     return false;
//   }
// };
