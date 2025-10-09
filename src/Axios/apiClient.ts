import axios from "axios";
import { environment } from "./Environments/environment.dev";

export const apiClient = axios.create({
    baseURL: environment.url,
    headers: {
        "Content-type": "application/json"
    },
    timeout: 10_000
});

apiClient.interceptors.request.use(
    //jwt config needed to check if token is in the local/session storage
    //if jwt is in, add it to the config headers
);

