import React from 'react';
import PrivateHeader from './PrivateHeader';
import LinkList from './LinkList';
import AddLink from './AddLink';
import LinksListFilters from './LinksListFilters';

export default() => {
    return (
        <div>
            <PrivateHeader title="Short Lnk - Your links"/>
            <div className="page-content">
                <LinksListFilters/>
                <AddLink/>
                <LinkList/>
            </div>
        </div>
    );
}
