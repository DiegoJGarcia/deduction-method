import React, { FC } from 'react';
import './Themer.scss';

import sun from 'assets/sun.png';
import moon from 'assets/moon.png';

// import defaultLayout from 'assets/default-layout.png';
// import verticalLayout from 'assets/vertical-layout.png';

import { useThemeStore } from 'src/global/theme/theme.store';
// import { LAYOUTS } from 'src/global/theme/theme.state';

type ThemerProps = {
	modeDisabled?: boolean;
	layoutDisabled?: boolean;
	className?: string;
	hideLayout?: boolean;
};

const Themer: FC<ThemerProps> = ({ modeDisabled, layoutDisabled, className, hideLayout }) => {
	const [mode, changeMode] = useThemeStore(state => [state.mode, state.changeMode]);
	// const [layout, changeLayout] = useThemeStore(state => [state.layout, state.changeLayout]);

	return (
		<div className={`themer${className ? ` ${className}` : ''}`}>
			<button className="themer-mode" onClick={changeMode} disabled={modeDisabled}>
				{mode === 'light' ? (
					<img src={sun} alt="mode-light" />
				) : (
					<img src={moon} alt="layout-dark" />
				)}
			</button>
			{/* {!hideLayout && (
				<button className="themer-layout" onClick={changeLayout} disabled={layoutDisabled}>
					{layout === LAYOUTS.vertical ? (
						<img src={defaultLayout} alt="layout-default" />
					) : (
						<img src={verticalLayout} alt="layout-dark" />
					)}
				</button>
			)} */}
		</div>
	);
};

export default Themer;
