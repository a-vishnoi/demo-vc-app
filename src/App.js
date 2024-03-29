import React, {useEffect, useState} from 'react';
import JoinForm from "./JoinForm";
import "./styles.css";
import Conference from "./Conference";
import Header from "./Header";
import Footer from "./Footer";
import {
	selectIsConnectedToRoom,
	useHMSActions,
	useHMSStore
} from "@100mslive/hms-video-react";


const App = () => {
	
	const isConnected = useHMSStore(selectIsConnectedToRoom);
	const hmsActions = useHMSActions();
	
	useEffect(() => {
		window.onunload = () => {
			if (isConnected) {
				hmsActions.leave();
			}
		};
	}, [hmsActions, isConnected]);
	
  return (
    <div className="App">
	    <Header />
	    {isConnected ? (
		    <>
		      <Conference />
		      <Footer />
		    </>
	    ) : (
		    <JoinForm />
	    )}
    </div>
  );
}

export default App;
