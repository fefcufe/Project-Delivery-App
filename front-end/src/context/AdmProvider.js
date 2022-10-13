import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import AdmContext from './AdmContext';

function AdmProvider({ children }) {
  const [users, setUsers] = useState([]);

  const contextValue = useMemo(() => ({
    users,
    setUsers,
  }), [users]);

  return (
    <AdmContext.Provider value={ contextValue }>
      { children }
    </AdmContext.Provider>
  );
}

AdmProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdmProvider;
