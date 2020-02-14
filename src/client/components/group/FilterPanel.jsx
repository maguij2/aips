import React from 'react';
import PropTypes from 'prop-types';

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class FilterPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            category: "Category",
        };

        this.setCategory = this.setCategory.bind(this);
        this.generateCategories = this.generateCategories.bind(this);
    };

    setCategory(id) {
        this.props.filter(id);
    }

    generateCategories(categories) {
        return categories.map((category) => {
            return (
                <DropdownItem
                    key={category.id}
                    onClick={() => {this.setCategory(category.id); this.setState({ category: category.name});}}
                    value={category.id}
                >
                    {category.name}
                </DropdownItem>
            );
        });
    }

    render() {
        const { isOpen, category } = this.state;
        const { categories } = this.props;

        const generatedItems = this.generateCategories(categories);

        return (
                <Dropdown isOpen={isOpen} toggle={() => this.setState({ isOpen: !isOpen })}>
                    <DropdownToggle caret color="primary">
                        {category}
                    </DropdownToggle>
                    <DropdownMenu
                        modifiers={{
                        setMaxHeight: {
                            enabled: true,
                            order: 890,
                            fn: (data) => {
                            return {
                                ...data,
                                styles: {
                                ...data.styles,
                                overflow: 'auto',
                                maxHeight: '600px',
                                },
                            };
                            },
                        },
                        }}>
                        <DropdownItem
                            key={0}
                            onClick={() => {this.setCategory(0); this.setState({ category: "All"});}}
                            value={0}
                        >
                            All
                        </DropdownItem>
                        {generatedItems}
                    </DropdownMenu>
                </Dropdown>
        );
    }

};

FilterPanel.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    filter: PropTypes.func.isRequired,
};

export default FilterPanel;