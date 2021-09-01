import React, {useState} from 'react';

const RangeSlider = ({hmsActions, trackID}) => {
	
	const [volume, setVolume] = useState(100);
	
	const handleChange = (e) => {
		setVolume(e.target.value);
		hmsActions.setVolume(volume, trackID);
	};
	
  return (
	  <form>
		  <input type="range" id="vol" name="vol" value={volume} min="0" max="100" onChange={handleChange}/>
	  </form>
  );
};

export default RangeSlider;