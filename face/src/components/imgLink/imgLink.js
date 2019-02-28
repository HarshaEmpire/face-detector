import React from  'react';
import "./imgLink.css"
const ImageLinkForm =({OnInputChange,OnSubmit})=>{
	return(
		<div>
			<center><p className=" f3">
				{'This magic brain will detect faces in ur picture'}
			</p></center>
			<div className="center">
				<div className="i1 pa4 br3 shadow-5">
					<input onChange={OnInputChange} className="f4 pa2 w-70 " type="text" />
					<button onClick={OnSubmit} className="w-30 grow f4 link pa2 pd2 dib white bg-light-purple">Detect</button>
				</div>
			</div>
		</div>
		);
}
export default ImageLinkForm;