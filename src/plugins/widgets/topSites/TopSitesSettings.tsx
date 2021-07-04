import React, { FC } from 'react';

import { Props } from './types';

const TopSitesSettings: FC<Props> = ({
    data = { onePerDomain: false },
    setData,
}) => (
        <div className="TopSitesSettings">
            <label>
                <input
                    type="checkbox"
                    checked={data.onePerDomain}
                    onChange={() =>
                        setData({ ...data, onePerDomain: !data.onePerDomain })
                    }
                />{' '}
                Ignore duplicate domains (Firefox Only)
            </label>
        </div>
    );

export default TopSitesSettings;
