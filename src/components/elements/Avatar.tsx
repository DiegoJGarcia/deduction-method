import React, { FC } from 'react';
import avatar from 'assets/avatar.svg';

import './Avatar.scss';

type AvatarProps = {
	pic?: string;
	small?: boolean;
	name?: string;
};

const Avatar: FC<AvatarProps> = ({ pic = avatar, small = false, name = 'profile' }) => {
	return (
		<div className={`avatar ${small && ' avatar_small'}`}>
			<img src={pic} alt={`${name}-image`} />
		</div>
	);
};

export default Avatar;
