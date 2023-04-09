import React from 'react';
import { useParams } from 'react-router-dom';

export default function DriverDetails() {
  const { id } = useParams();

  return (
    <div>
      Driver Details
    </div>
  )
}
