import Client from './instance';

export async function getRequests(URL: string, params: object) {
  const response = Client.get(URL, { params: params });
  return response;
}

export async function postRequests(URL: string, params: object) {
  const response = Client.post(URL, params);
  return response;
}
