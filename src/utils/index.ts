export const BASE_URL = "https://customer-management-api-bdjh.onrender.com";

export const formatDate = (date: any) => {
  const dia = String(date.getDate()).padStart(2, "0");
  const mes = String(date.getMonth() + 1).padStart(2, "0");
  const ano = date.getFullYear();

  return `${dia}/${mes}/${ano}`;
};

export const fetchHeaders = () => {
  const token = localStorage.getItem("token:customer");
  const header = {
    Authorization: `Bearer ${token}`,
  };

  return header;
};
