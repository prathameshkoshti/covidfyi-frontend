import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Auxiliary from '../hoc/Auxiliary/Auxiliary'
import getDataFor from '../utils/getDataFor'

const styles = (theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 150,
	},
	selectEmpty: {
		marginTop: theme.spacing(1),
	},
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
		},
	},
};

class AdditionalFilters extends Component {
	constructor(props) {
		super(props)
		this.state = {
			subCategories: [],
			categoryData: [],
			subCategorySelected: []
		}
	}

	async componentDidMount() {
		let categoryData = await getDataFor({ state: this.props.state + '/' + this.props.category })
		this.setState({
			subCategories: [... new Set(categoryData.results.map(data => data.subcategory))],
		})
	}

	async componentDidUpdate(prevProps, prevState) {
		if (prevProps.category !== this.props.category || prevProps.area !== this.props.area) {
			let categoryData = await getDataFor({ state: this.props.state + '/' + this.props.category })
			if (this.props.area) {
				let data = categoryData.results.filter(data => data.area === this.props.area)
				this.setState({
					subCategories: [... new Set(data.map(data => data.subcategory))],
					subCategorySelected: []
				})
			}
			else {
				this.setState({
					subCategories: [... new Set(categoryData.results.map(data => data.subcategory))],
					subCategorySelected: []
				})
			}
		}
	}

	optionChangeHandler = (event, index, values) => {
		this.setState({
			subCategorySelected: event.target.value
		})
		this.props.clickHandler(event.target.value)
	}

	render() {
		const { classes } = this.props;
		let addMenuItems = true
		if (this.state.subCategories.includes(undefined) || this.state.subCategories.length < 1) {
			addMenuItems = false
		}

		return (
			<Auxiliary>
				{addMenuItems ? <div>
					<FormControl className={classes.formControl} >
						<InputLabel id="demo-mutiple-checkbox-label">Sub Category</InputLabel>
						<Select
							labelId="demo-mutiple-checkbox-label"
							id="demo-mutiple-checkbox"
							multiple
							value={this.state.subCategorySelected}
							onChange={this.optionChangeHandler.bind(this)}
							input={<Input />}
							renderValue={(selected) => selected.join(', ')}
							MenuProps={MenuProps}
						>
							{Array.from(this.state.subCategories).sort().map((name, index) => (
								<MenuItem key={index} value={name}>
									<Checkbox checked={this.state.subCategorySelected.indexOf(name) > -1} />
									<ListItemText primary={name} />
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</div> : null}

			</Auxiliary>
		)
	}
}


export default withStyles(styles, { withTheme: true })(AdditionalFilters)