import React from 'react';

// core components
import Wizard from '../../components/Wizard/Wizard.jsx';
import GridContainer from '../../components/Grid/GridContainer.jsx';
import GridItem from '../../components/Grid/GridItem.jsx';

import Step1 from './WizardSteps/Step1.jsx';
import Step2 from './WizardSteps/Step2.jsx';
import Step3 from './WizardSteps/Step3.jsx';

class WizardView extends React.Component {
  finishButtonClick = props => {
    console.log('all data-----', props);
  };

  render() {
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={8}>
          <Wizard
            validate
            steps={[
              { stepName: 'About', stepComponent: Step1, stepId: 'about' },
              { stepName: 'Contact Information', stepComponent: Step2, stepId: 'contact' },
              { stepName: 'Description', stepComponent: Step3, stepId: 'description' }
            ]}
            title="Build Your Profile"
            subtitle="This information will let us know more about you."
            finishButtonClick={this.finishButtonClick}
          />
        </GridItem>
      </GridContainer>
    );
  }
}

export default WizardView;
