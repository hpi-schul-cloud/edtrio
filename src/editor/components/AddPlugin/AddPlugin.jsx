import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';

import {
    Collapsible,
    Modal,
    MenuItem,
    PluginPreview,
} from 'x-editor/UI';

import {
    FabButton,
} from 'x-editor/UI/Button';

import styles from './styles.scss';

class AddPlugin extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            open: false,
        }
    }

    handleOpen() {
        this.setState({ open: true })
    }

    handleClose() {
        this.setState({ open: false })
    }

    render() {
        const { allPlugins } = this.props;

        return (
            <React.Fragment>
                <Modal
                    open={this.state.open}
                    onClose={() => this.handleClose()}>
                    { <React.Fragment>
                        <Collapsible title="All Elements">
                            {allPlugins.map(({ info }) => {
                                return (
                                    <MenuItem
                                        key={info.name}
                                        onClick={e => {
                                            this.handleClose()
                                            this.props.addPlugin(info)
                                        }} ><PluginPreview name={info.name}
                                                           description={info.description} /></MenuItem>)
                            })
                            }
                        </Collapsible>
                    </React.Fragment>
                    }
                </Modal>
                
                <FabButton
                    className={styles.floating_button}
                    onClick={() => this.handleOpen()}>
                    <i className="material-icons">add</i>
                </FabButton>
            </React.Fragment>
        )
    }

    static propTypes = {
        allPlugins: PropTypes.arrayOf(
            PropTypes.shape({
                info: PropTypes.object.isRequired,
                Plugin: PropTypes.func.isRequired
            })
        ).isRequired,
        addPlugin: PropTypes.func.isRequired,
    }

    static displayName = "AddPlugin Button";
}

export default AddPlugin
