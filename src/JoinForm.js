import React from 'react';
import { useState } from "react";
import {useHMSActions} from "@100mslive/hms-video-react";

const JoinForm = () => {
	const hmsActions = useHMSActions();
	const [inputValues, setInputValues] = useState({
		name: "",
		token: ""
	});
	
	const handleInputChange = (e) => {
		setInputValues((prevValues) => ({
			...prevValues,
			[e.target.name]: e.target.value
		}));
	};
	
	const handleSubmit = (e) => {
		e.preventDefault();
		hmsActions.join({
			userName: inputValues.name,
			authToken: inputValues.token
		});
	};
	
	return (
		<form onSubmit={handleSubmit}>
			<h2>Join Room</h2>
			<div className="input-container">
				<input
					value={inputValues.name}
					onChange={handleInputChange}
					id="name"
					type="text"
					name="name"
					placeholder="Your name"
				/>
			</div>
			<div className="input-container">
				<input
					value={inputValues.token}
					onChange={handleInputChange}
					id="token"
					type="text"
					name="token"
					placeholder="Auth token"
				/>
			</div>
			<button className="btn-primary">Join</button>
		</form>
	);
}

export default JoinForm;
