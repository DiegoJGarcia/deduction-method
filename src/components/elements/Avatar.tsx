import React, { FC } from 'react';
// import avatar from 'view/images/avatar.svg';

import './Avatar.scss';

type AvatarProps = {
	pic?: string;
	small?: boolean;
};

const Avatar: FC<AvatarProps> = ({ pic, small = false }) => {
	return (
		<div className={`avatar ${small && ' avatar_small'}`}>
			<img src={pic} alt="profile_picture" />
		</div>
	);
};

export default Avatar;
