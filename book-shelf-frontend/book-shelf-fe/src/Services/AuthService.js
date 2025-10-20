 
 const baseUrl = "/api/Auth/";

export async function LoginRequest(bodyParams) {
try {
        let response = await fetch(`${baseUrl}login`,{
        method:"POST",
        body: JSON.stringify(bodyParams),
        headers:{
            "Content-Type":"Application/Json",
            Authorisation:`Bearer $token`
        }
    });
    if(!response){throw new Error("Login api error", response.status)}
    const resbody = await response.json()
    return resbody
} catch (error) {
    console.warn("Login api error",error)
}
}


export async function UserProfileRequest(token) {
try {
        let response = await fetch(`${baseUrl}profile`,{
        method:"GET",
        headers:{
            "Content-Type":"Application/Json",
            Authorisation:`Bearer ${token}`
        }
    });
    if(!response){throw new Error("Profile api error", response.status)}
    const resbody = await response.json()
    return resbody
} catch (error) {
    console.warn("Profile api error",error)
}
}
