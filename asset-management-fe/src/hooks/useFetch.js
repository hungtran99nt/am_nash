import {useEffect, useState} from 'react';
import axios from 'axios';

const useFetch = (initialData, url, convertResponseToData) => {
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState(initialData);
	const [errorMessage, setErrorMessage] = useState('');

	const token = localStorage.getItem("TOKEN");

	if (token) {
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
