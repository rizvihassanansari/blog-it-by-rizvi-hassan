const setToLocalStorage = ({ authToken, email, userId, userName }) => {
  localStorage.setItem("authToken", JSON.stringify(authToken));
  localStorage.setItem("authEmail", JSON.stringify(email));
  localStorage.setItem("authUserId", JSON.stringify(userId));
  localStorage.setItem("authUserName", JSON.stringify(userName));
};

const getFromLocalStorage = key => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
};

const setPreviewPost = post => {
  localStorage.setItem("previewPost", JSON.stringify(post));
};

const getPreviewPost = () => {
  try {
    return JSON.parse(localStorage.getItem("previewPost"));
  } catch {
    return null;
  }
};

export {
  setToLocalStorage,
  getFromLocalStorage,
  setPreviewPost,
  getPreviewPost,
};
