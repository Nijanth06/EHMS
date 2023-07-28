import CryptoJS from "crypto-js";
import jwtDecode from "jwt-decode";

const key = "as123"
export const encrypt = (text) => {
    try {
        const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(text), key).toString()
        return encryptedData
    } catch (err) {
        return null
    }

}
export const decrypt = (text) => {
    if (text !== null) {
        try {
            const byte = CryptoJS.AES.decrypt(text, key)
            const data = JSON.parse(byte.toString(CryptoJS.enc.Utf8))
            return data
        } catch (err) {
            return null
        }

    }
}
export const decryptNdecode = (text) => {
    if (text !== null) {
        try {
            const byte = CryptoJS.AES.decrypt(text, key)
            const data = JSON.parse(byte.toString(CryptoJS.enc.Utf8))
            const decoded = jwtDecode(data)
            return decoded
        } catch (err) {
            return null
        }

    }
}