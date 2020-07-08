import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { createLogEntry } from './API';

const LogEntryForm = ({ location, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      data.latitude = location.latitude;
      data.longitude = location.longitude;
      console.log(data);
      const created = await createLogEntry(data);
      console.log(created);
      
      onClose();
    } catch (error) {
      console.log(error);
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='entry-form'>
      {error ? <h3 classNam='error'>{error}</h3> : null}
      {/* <h3>Add Entry</h3>
      <small>
        {location.latitude}, {location.longitude}
      </small> */}
      <label htmlFor='title'>Title</label>
      <input name='title' required ref={register} />
      <label htmlFor='description'>Description</label>
      <textarea name='description' rows={3} ref={register}></textarea>
      <label htmlFor='image_url'>Image</label>
      <input name='image_url' ref={register} />
      <label htmlFor='comments'>Comments</label>
      <textarea name='comments' rows={3} ref={register}></textarea>
      <label htmlFor='visitDate'>Visit Date</label>
      <input name='visitDate' type='date' required ref={register} />
      <button disabled={loading}>{loading ? 'Loading...' : 'Add'}</button>
    </form>
  );
};

export default LogEntryForm;
