import axios from "axios";
const BASE_URL = "/api/v1/admin";

const apiService = {
    getUserData: async (userId) => {
        try {
            const response = await axios.get(`/users/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching user data', error);
            throw error;
        }
    },

    createUser: async (userData) => {
        try {
            const response = await axios.post(`${BASE_URL}/users`, userData);
            return response.data;
        } catch (error) {
            console.error('Error creating user', error);
            throw error;
        }
    },

    // ******************************** Api Authentication Section ********************************

    login: async (email, password) => {
        try {
            const response = await axios.post(`${BASE_URL}/signIn`, { email, password });
            return response?.data;
        } catch (error) {
            console.error('Error logging in', error);
            throw error;
        }
    },
    forgot: async (email) => {
        try {
            const response = await axios.post(`${BASE_URL}/forgot/password`, { email });
            return response?.data;
        } catch (error) {
            console.error('Error logging in', error);
            throw error;
        }
    },
    optVerification: async (email, otp) => {
        try {
            const response = await axios.post(`${BASE_URL}/verify/otp`, { email, otp });
            return response?.data;
        } catch (error) {
            console.error('Error logging in', error);
            throw error;
        }
    },
    reset: async (email, password, confirmPassword) => {
        try {
            const response = await axios.post(`${BASE_URL}/reset/password`, { email, password, confirmPassword });
            return response?.data;
        } catch (error) {
            console.error('Error logging in', error);
            throw error;
        }
    },
    logout: async () => {
        try {
            const response = await axios.post(`${BASE_URL}/logout`);
            return response.data;
        } catch (error) {
            console.error('Error logging out', error);
            throw error;
        }
    },
    // ********************************************************************************************

    // Add other API calls here


    // ***************************** MANAGE FEEDS *******************************

    getAllhashTag: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/get/all/hashtags`);
            return response.data;
        } catch (error) {
            console.error('Error logging out', error);
            throw error;
        }
    },
    createPost: async (postData) => {
        try {
            const response = await axios.post(`${BASE_URL}/add/app/post`, postData);
            return response.data;
        } catch (error) {
            console.error('Error logging out', error);
            throw error;
        }
    },
    createNews: async (postData) => {
        try {
            const response = await axios.post(`${BASE_URL}/add/app/news/feed`, postData);
            return response.data;
        } catch (error) {
            console.error('Error logging out', error);
            throw error;
        }
    },
    // **************************************************************************

    // ***************************** Manage All Post Section **********************************

    managePost: async (pagedata) => {
        try {

            const response = await axios.get(`${BASE_URL}/get/all/app/posts?limitPerPage=${pagedata?.limitPerPage}&pageNo=${pagedata?.currentPage}`);

            return response.data;
        } catch (error) {
            console.error('Error logging out', error);
            throw error;
        }
    },
    manageNews: async (pagedata) => {
        try {
            const response = await axios.get(`${BASE_URL}/get/all/news/feeds?limitPerPage=${pagedata?.limitPerPage}&pageNo=${pagedata?.currentPage}`);

            return response.data;
        } catch (error) {
            console.error('Error logging out', error);
            throw error;
        }
    },


    singleUserPost: async (id) => {

        try {
            const response = await axios.get(`${BASE_URL}/get/single/app/post/${id.id}`);
            return response.data;
        } catch (error) {
            console.error('Error logging out', error);
            throw error;
        }
    },
    singleUserNews: async (id) => {

        try {
            const response = await axios.get(`${BASE_URL}/get/single/news/feed/${id.id}`);
            return response.data;
        } catch (error) {
            console.error('Error logging out', error);
            throw error;
        }
    },
    singleUserSocialMedia: async (id) => {

        try {
            const response = await axios.get(`${BASE_URL}/get/single/social/post/${id.id}`);
            return response.data;
        } catch (error) {
            console.error('Error logging out', error);
            throw error;
        }
    },

    deleteAppPost: async (post) => {

        try {
            const response = await axios.put(`${BASE_URL}/delete/feed?feedId=${post}`);
            return response.data;
        } catch (error) {
            console.error('Error logging out', error);
            throw error;
        }
    },
    deleteHashtags: async (selectedHashtags) => {

        try {
            const response = await axios.put(`${BASE_URL}/delete/hashtags`, { hashtags: selectedHashtags });
            return response.data;
        } catch (error) {
            console.error('Error logging out', error);
            throw error;
        }
    },


    // **************************************************************************
    // ************************ MENTORSHIP SECTION *******************************

    AllVerifyMentor: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/get/all/verification/requests`);
            // const data = await response.json();
            return response.data;
        } catch (error) {
            console.error('Error logging out', error);
            throw error;
        }
    },
    VerifyMentor: async (status, verificationId,) => {
        // console.log(" status=====>", status, verificationId,)
        try {
            const response = await axios.post(`${BASE_URL}/update/mentor/verification/status`, {
                status,
                verificationId
            });
            // const data = await response.json();
            return response.data;
        } catch (error) {
            console.error('Error logging out', error);
            throw error;
        }
    },


    MentorShipAllStudyMaterial: async () => {

        try {
            const response = await axios.get(`${BASE_URL}/get/all/study/materials`);
            // const data = await response.json();
            return response.data;
        } catch (error) {
            console.error('Error logging out', error);
            throw error;
        }
    },
    UploadStudyMaterial: async (getFormData) => {

        try {
            const response = await axios.post(`${BASE_URL}/add/study/material`, getFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            );
            return response.data;
        } catch (error) {
            console.error('Error logging out', error);
            throw error;
        }
    },

    GetyourUploadeMaterial: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/get/all/added/study/materials`);
            return response.data;
        } catch (error) {
            console.error('Error logging out', error);
            throw error;
        }
    },
    StydyMaterialDeletePost: async (ID) => {
        try {
            const response = await axios.put(`${BASE_URL}/delete/study/material/${ID}`);
            return response.data;
        } catch (error) {
            console.error('Error logging out', error);
            throw error;
        }
    },
    getSingleUser: async (userId) => {
        // console.log("user Id", userId)
        try {
            const response = await axios.get(`/api/v1/admin/get/single/user?userId=${userId}`);
            return response?.data;
        } catch (error) {
            console.error('Error logging out', error);
            throw error;
        }
    },


    // ************************ MENTORSHIP SECTION *******************************


    // ***************************** Add Social Media Post Section **************************

    getAllSocialMediaAccount: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/get/all/social/media/accounts`);
            // const data = await response.json();
            return response.data;
        } catch (error) {
            console.error('Error logging out', error);
            throw error;
        }
    },
    createSocialMediaPost: async (formData, id) => {
        console.log("form data At API", formData)
        try {
            const response = await axios.post(`${BASE_URL}/add/social/media/post/${id}`, formData);
            return response;
        } catch (error) {
            console.error('Error logging out', error);
            throw error;
        }
    },
    getAllSocialMediaPosts: async (pagedata) => {
        // console.log("pageData", pagedata.limitPerPage)
        // ?limitPerPage=${pagedata.limitPerPage}&pageNo=${pagedata.currentPage}
        try {
            const response = await axios.get(`${BASE_URL}/get/all/social/media/posts?limitPerPage=${pagedata?.limitPerPage}&pageNo=${pagedata?.currentPage}`);
            return response;
        } catch (error) {
            console.error('Error logging out', error);
            throw error;
        }
    },
    deletePost: async (id) => {
        try {
            const response = await axios.put(`${BASE_URL}/delete/feed?feedId=${id}`);
            return response;
        } catch (error) {
            console.error('Error logging out', error);
            throw error;
        }
    },
    // **********************************CMS SECTION API******************************************

    getPrivacyAndPolicy: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/get/policies`);
            return response;
        } catch (error) {
            console.error('Error logging out', error);
            throw error;
        }
    },
    PostPrivacyAndPolicy: async (editorData) => {
        try {
            const response = await axios.post(`${BASE_URL}/create/update/policy`, { policy: editorData });
            return response;
        } catch (error) {
            console.error('Error logging out', error);
            throw error;
        }
    },
    getTermsAndConditions: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/get/terms/conditions`);
            return response;
        } catch (error) {
            console.error('Error logging out', error);
            throw error;
        }
    },
    PostTermsAndConditions: async (editorData) => {
        try {
            const response = await axios.post(`${BASE_URL}/create/update/terms/conditions`, { termsAndConditions: editorData });
            return response;
        } catch (error) {
            console.error('Error logging out', error);
            throw error;
        }
    },


    // **********************************CMS SECTION API******************************************


};

export default apiService;
