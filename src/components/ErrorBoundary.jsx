import React, {Component} from 'react'
import * as Sentry from '@sentry/browser'
import { UserInformationError } from '~/utils/errors'


const defaultMessage = 'Es ist ein schwerwiegender Fehler aufgetretten';
class ErrorBoundary extends Component {

	

	constructor(props) {
		super(props);

		this.state = {
		  	eventId: null,
			hasError: false,
			message: defaultMessage
		};
	}

	static getDerivedStateFromError (error) {
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		console.log(error)
		if(error instanceof UserInformationError){
			
			this.setState({
				...this.state,
				message: error.message
			})
		}
		Sentry.withScope((scope) => {
			scope.setExtras(errorInfo);
			const eventId = Sentry.captureException(error);
			this.setState({eventId});
		});
	}

	render() {
		if (this.state.hasError) {
            // render fallback UI
            return (
				<React.Fragment>
					<h1>{this.state.message}</h1>
					<button onClick={() => Sentry.showReportDialog({ eventId: this.state.eventId })}>Fehler melden</button>
				</React.Fragment>
            );
        }

	  return this.props.children;
	}
  }

  export default ErrorBoundary;