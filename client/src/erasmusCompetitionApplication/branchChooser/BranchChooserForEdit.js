import { useFetcher } from '../../hooks/useFetcher';
import { useGetCurrentUser } from '../../hooks/useGetCurrentUser';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table } from 'react-bootstrap';

export function BranchChooserForEdit({ onSubmit, onUserChoice, choice, choices, title, branches }) {
  const firstChoice = choices; 
  const [selectedBranch, setSelectedBranch] = useState(choice);

  const handleRowClick = (branch) => {
    setSelectedBranch(selectedBranch?._id === branch._id ? null : branch);
  };

  const handleSubmit = () => {
    if (selectedBranch == null) {
      onUserChoice(firstChoice?.branch); 
    } else {
      onUserChoice(selectedBranch);
    }
    onSubmit();
  };

  return (
    <>
      <h2>{title}</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr className="text-center">
            <th>Institucija</th>
            <th>Lokacija</th>
          </tr>
        </thead>
        <tbody>
          {branches &&
            branches.map((group) => (
              <React.Fragment key={group.institution._id}>
                <tr key={group.institution._id} className="table-primary">
                  <td colSpan={4} className="text-center">
                    <strong>{group.institution.name}</strong>
                  </td>
                </tr>
                {group.branches.map((branch) => (
                  <tr
                    key={branch._id}
                    onClick={() => handleRowClick(branch)}
                    className={selectedBranch?._id === branch._id ? 'table-success' : ''}
                    style={{ cursor: 'pointer' }}
                  >
                    <td
                      style={{
                        backgroundColor:
                          selectedBranch?._id === branch._id
                            ? 'lightgreen' 
                            : firstChoice?.branch._id === branch._id && selectedBranch === null
                              ? 'lightyellow' 
                              : 'inherit', 
                        padding: '10px',
                        borderRadius: '4px',
                      }}
                    >
                      {branch.name}
                    </td>
                    <td
                      style={{
                        backgroundColor:
                          selectedBranch?._id === branch._id
                            ? 'lightgreen'
                            : firstChoice?.branch._id === branch._id && selectedBranch === null
                              ? 'lightyellow'
                              : 'inherit',
                        padding: '10px',
                        borderRadius: '4px',
                      }}
                    >
                      {branch.city}, {branch.country}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
        </tbody>
      </Table>
      <Button variant="primary" type="button" onClick={handleSubmit}>
        Dalje
      </Button>
    </>
  );
}