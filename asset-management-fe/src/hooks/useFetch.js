import {useEffect, useState} from 'react';
import axios from 'axios';

const useFetch = (initialData, url, convertResponseToData) => {
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState(initialData);
	const [errorMessage, setErrorMessage] = useState('');

	const token = localStorage.getItem("TOKEN");

	// const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJiaW5obnY0Iiwib3JnIjoibmFzaHRlY2giLCJleHAiOjE2MzczMDY0NjgsImlhdCI6MTYzNzI4ODQ2OH0.zPMBRkRq08V6PJ3bkF8HT7tDhSvt8OzqIdB8mbrzQW4gAhtYM4N0OLOhddL_vVTPD3LeR--M27rwkP3U7NTwDw";

	if (token !== null && token !== "") {
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	}

	useEffect(() => {
		let didCancel = false;
		setIsLoading(true);
		axios({
			method: 'GET',
			url: url,
		}).then(response => {
			if (!didCancel) {
				console.log(response);
				setIsLoading(false);
				setData(convertResponseToData(response));
			}
		}).catch(error => {
			if (!didCancel) {
				setIsLoading(false);
				setErrorMessage(error.message);
			}
		});
		return () => {
			didCancel = true;
		}
	}, [url, convertResponseToData]);

	return {
		isLoading,
		data,
		errorMessage
	}
}
export default useFetch;
