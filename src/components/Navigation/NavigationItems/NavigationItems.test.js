import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import React from 'react';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });

describe('<NavigationItem/>', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems/>);
    });

    it('should render 2 navigation items if not authenticated', () => {
         expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render 3 navigation items if authenticated', () => {
        wrapper.setProps({ isAuth: true });
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should contain logout navigation item if authenticated', () => {
        wrapper.setProps({ isAuth: true });
        expect(wrapper.contains(<NavigationItem link='/logout'>Log Out</NavigationItem>)).toEqual(true);
    });
});