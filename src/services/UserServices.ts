import User from "../interfaces/User";
import UserFilter from "../interfaces/UserFilter";

export default class UserServices {
    #domain: string = "";

    constructor() {
        this.#domain = import.meta.env.VITE_PACIFICOLLEGE;
    }

    headers() {
        const user = localStorage.getItem("user_token");
        let token = "";

        if (user && user != "undefined") {
            const userFormat = JSON.parse(user);
            token = userFormat
        } else {
            localStorage.removeItem("user_token")
        }

        return {
            "Content-type": "application/json",
            'Authorization': `Bearer ${token}`,
            // "Access-Control-Allow-Origin": '*',

        }
    }

    auth(payload: any) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`${this.#domain}/auth/login`, {
                    method: "POST",
                    body: JSON.stringify(payload),
                    headers: { "Content-type": "application/json" },
                });
                const json = await response.json();
                resolve(json);
            } catch (error) {
                reject(error)
            }
        });
    }

    async getAllForPageable(page: number) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`${this.#domain}/page/${page}/10`, {
                    headers: this.headers(),
                    referrerPolicy: "strict-origin-when-cross-origin"
                });
                const json = await response.json();
                resolve(json);
            } catch (error) {
                reject(error);
            }
        });
    }

    getLateStudentsForPageable(page: number) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`${this.#domain}/late/students/${page}/10`, {
                    headers: this.headers(),
                    referrerPolicy: "strict-origin-when-cross-origin"
                });
                const json = await response.json();
                resolve(json);
            } catch (error) {
                reject(error);
            }
        });
    }

    getDownloadFile(filter: UserFilter) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`${this.#domain}/export`, {
                    method: "POST",
                    body: JSON.stringify(filter),
                    headers: this.headers(),
                    referrerPolicy: "strict-origin-when-cross-origin"
                });
                const blob = await response.blob(); // Archivos de datos en byte[] "blob"
                const url = window.URL.createObjectURL(blob);

                // generar archivo y enlace de descargar
                const a = document.createElement("a");
                a.style.display = "none";
                a.href = url;

                // the filename you want
                a.download = "prueba.xls";
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                resolve(true);
            } catch (error) {
                reject(error)
            }
        });
    }

    getForSearch(page: number, filter: UserFilter) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`${this.#domain}/filtro?pageNo=${page}`, {
                    method: "POST",
                    body: JSON.stringify(filter),
                    headers: this.headers(),
                    referrerPolicy: "strict-origin-when-cross-origin"
                });
                const json = await response.json();
                resolve(json);
            } catch (error) {
                reject(error);
            }
        });
    }

    post(body: User) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`${this.#domain}/create`, {
                    method: "POST",
                    body: JSON.stringify(body),
                    headers: this.headers(),
                    referrerPolicy: "strict-origin-when-cross-origin"
                });

                const json = await response.json();
                
                if (json?.message) {
                    reject(json);
                } else {
                    resolve(json);
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    patch(id: number, body: User) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`${this.#domain}/update/${id}`, {
                    method: "PATCH",
                    body: JSON.stringify(body),
                    headers: this.headers(),
                    referrerPolicy: "strict-origin-when-cross-origin"
                });
                const json = await response.json();
                resolve(json);
            } catch (error) {
                reject(error);
            }
        });
    }

    delete(id: number) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`${this.#domain}/delete/${id}`, {
                    method: "DELETE",
                    headers: this.headers(),
                    referrerPolicy: "strict-origin-when-cross-origin"
                });
                const json = await response.json();
                resolve(json);
            } catch (error) {
                reject(error);
            }
        });
    }
}