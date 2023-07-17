import { useState } from 'react';

const usePasswordStrength = () => {
  const [passwordStrength, setPasswordStrength] = useState('');
  const [isValidPassword, setIsValidPassword] = useState(true);

  const handlePasswordChange = (event) => {
    const password = event.target.value;

    // Calculate password strength
    const strength = calculatePasswordStrength(password);
    setPasswordStrength(strength);

    // Check if password is valid
    setIsValidPassword(strength !== 'Weak');
  };

  const calculatePasswordStrength = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (password.match(regex)) {
      return 'Strong';
    } else if (password.length >= 6) {
      return 'Medium';
    } else {
      return 'Weak';
    }
  };

  return { passwordStrength, isValidPassword, handlePasswordChange };
};

export default usePasswordStrength;
