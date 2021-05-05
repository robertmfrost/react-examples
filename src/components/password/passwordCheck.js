// Rules and copy could theoretically come from an API call instead
import { match, requirements } from './passwordRequirements.json';

const passwordCheck = (newPassword, retypePassword) => {
  const checks = requirements.filter(requirement => requirement.rule).map(requirement => ({
    pass: newPassword?.match(new RegExp(requirement.rule)) || false,
    message: requirement.message,
  }));

  if (typeof retypePassword !== 'undefined') {
    checks.push({
      pass: newPassword === retypePassword,
      message: match,
    });
  }

  return checks;
};

export default passwordCheck;