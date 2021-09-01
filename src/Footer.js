import React from 'react';
import {
	selectIsLocalAudioEnabled,
	selectIsLocalVideoEnabled,
	useHMSActions,
	useHMSStore,
	selectIsLocalScreenShared
} from "@100mslive/hms-video-react";
import { HMSReactiveStore } from '@100mslive/hms-video-store';



const Footer = () => {
	
	const videoEnabled = useHMSStore(selectIsLocalVideoEnabled);
	const audioEnabled = useHMSStore(selectIsLocalAudioEnabled);
	const hmsActions = useHMSActions()
	const amIScreenSharing = useHMSStore(selectIsLocalScreenShared);
	
	
	const toggleAudio = () => {
		hmsActions.setLocalAudioEnabled(!audioEnabled);
	};
	
	const toggleVideo = () => {
		hmsActions.setLocalVideoEnabled(!videoEnabled);
	};
			
	// console.log(hmsStore);
	
	const toggleScreenShare = async () => {
		try {
			await hmsActions.setScreenShareEnabled(!amIScreenSharing);
		} catch (error) {
			console.log(error);
		}
	};
	
	const leaveRoom = () => {
		hmsActions.leave();
	};
	
	return (
		<div className="control-bar">
			<button className="btn-control" onClick={toggleAudio}>
				{audioEnabled ? "Mute" : "Unmute"}
			</button>
			<button className="btn-control" onClick={toggleVideo}>
				{videoEnabled ? "Hide" : "Unhide"}
			</button>
			<button className="btn-control" onClick={toggleScreenShare}>
				{amIScreenSharing ? "Don't Share" : "Share"}
			</button>
			<button className="btn-control" onClick={leaveRoom}>
				Leave Room
			</button>
		</div>
	);
};

export default Footer;