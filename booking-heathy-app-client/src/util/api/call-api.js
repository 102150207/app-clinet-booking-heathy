import { API_BASE_URL} from '../../constants';
import axios from 'axios';
import { ACCESS_TOKEN } from '../../constants';

const callAPI = async (endpoint, method = "GET", data) => {

    let token ;
    if(localStorage.getItem(ACCESS_TOKEN)) {
        token = localStorage.getItem(ACCESS_TOKEN);
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    let dataAPI = null;
	try {
		dataAPI = await axios({
			method,
			url: `${API_BASE_URL}/${endpoint}`,
            data,
		});
	} catch (e) {
		dataAPI = e.response
	} finally {
		return dataAPI;
	}
}

export async function  getUserApi() {
	let user = {};
	
	 await callAPI("user/role",'GET',null)
		.then(response =>{
			user = Object.assign({}, user);
			user =  response.data;
		})

	return user;
}