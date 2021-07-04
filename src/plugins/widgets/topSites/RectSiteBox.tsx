import React, { FC } from 'react';
import { TopSite } from './types';

import './TopSites.sass';

interface RectSiteBoxProps {
    site: TopSite;
}

const RectSiteBox: FC<RectSiteBoxProps> = ({
    site
}) => (
        <div className='TopSites-card'>
            {site.favicon && <img src={site.favicon} width='100%' />}
            <div className='container'>
                <a href={site.url}>
                    {site.title}
                </a>
            </div>
        </div>
    );

export default RectSiteBox;
