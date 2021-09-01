import React from 'react';
import { selectPeers, useHMSStore, selectPeersScreenSharing } from "@100mslive/hms-video-react";
import Peer from "./Peer";

const Conference = () => {
	const peers = useHMSStore(selectPeers);
	const presenters = useHMSStore(selectPeersScreenSharing);
	
	console.log(presenters);
	return (
		<div className="conference-section">
			<h2>Conference</h2>
			
			<div className="peers-container">
				{peers.map((peer) => (
					<Peer key={peer.id} peer={peer} presenters={presenters} />
				))}
			</div>
		</div>
	);
};

export default Conference;