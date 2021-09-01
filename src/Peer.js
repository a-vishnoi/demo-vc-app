import React from 'react';
import {
	selectVideoTrackByPeerID,
	useHMSActions,
	useHMSStore,
	selectIsLocalScreenShared,
	selectScreenShareByPeerID
} from "@100mslive/hms-video-react";
import { useRef, useEffect } from "react";
import RangeSlider from "./RangeSlider";

const Peer = ({ peer }) => {
	const videoRef = useRef(null);
	const hmsActions = useHMSActions();
	const videoTrack = useHMSStore(selectVideoTrackByPeerID(peer.id));
	const amIScreenSharing = useHMSStore(selectIsLocalScreenShared);
	const screenShareVideoTrack = useHMSStore(selectScreenShareByPeerID(peer.id));
	const screenShareRef = useRef(null);
	console.log(videoTrack);
	console.log(peer);
	useEffect(() => {
		if (videoRef.current && videoTrack) {
			if (videoTrack.enabled) {
				hmsActions.attachVideo(videoTrack.id, videoRef.current);
			} else {
				hmsActions.detachVideo(videoTrack.id, videoRef.current);
			}
		}
		if(screenShareRef.current && screenShareVideoTrack) {
			if(screenShareVideoTrack.enabled){
				hmsActions.attachVideo(screenShareVideoTrack.id, screenShareRef.current);
			}
			else{
				hmsActions.detachVideo(screenShareVideoTrack.id, screenShareRef.current);
			}
		}
	}, [videoTrack, hmsActions, screenShareVideoTrack]);
	
	return (
		<div className="peer-container">
			{
				<video
					width="1173"
					height="660"
					ref={screenShareRef}
					className={`peer-video ${peer.isLocal ? "local" : ""}`}
					autoPlay
					playsInline
				/>
			}
			{<br />}
			<video
				ref={videoRef}
				width={amIScreenSharing ? "200" : ""}
				height={amIScreenSharing ? "200" : ""}
				className={`peer-video ${peer.isLocal ? "local" : ""}`}
				autoPlay
				muted
				playsInline
			/>
			<div className="peer-name">
				{peer.name} {peer.isLocal ? "(You)" : ""}
			</div>
			{
				!peer.isLocal && <div>
					<RangeSlider hmsActions={hmsActions} trackID={peer.audioTrack}/>
				</div>
			}
		</div>
	);
};

export default Peer;