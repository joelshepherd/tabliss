import React, { useReducer, useEffect } from 'react';
import { Link, Props, defaultData } from './types';
import Input from './Input';
import { reducer } from './reducer';

const LinksSettings: React.FC<Props> = ({ data = defaultData, setData }) => {
  const [state, dispatch] = useReducer(reducer, data.links);
  useEffect(() => {
    setData({ ...data, links: state });
  }, [state]);

  return (
    <div className="LinksSettings">
      <label>
        Number of columns
        <input
          type="number"
          value={data.columns}
          onChange={event =>
            setData({ ...data, columns: Number(event.target.value) })
          }
          min={1}
        />
      </label>

      <label>
        <input
          type="checkbox"
          checked={data.visible}
          onChange={event => setData({ ...data, visible: !data.visible })}
        />
        Links are always visible
      </label>

      <hr />

      {data.links.map((link, index) => (
        <Input
          {...link}
          key={index}
          number={index + 1}
          onChange={values =>
            dispatch({
              type: 'UPDATE_LINK',
              data: { index, link: { ...link, ...values } },
            })
          }
          onMoveUp={
            index !== 0
              ? () =>
                  dispatch({
                    type: 'REORDER_LINK',
                    data: { index, to: index - 1 },
                  })
              : undefined
          }
          onMoveDown={
            index !== data.links.length - 1
              ? () =>
                  dispatch({
                    type: 'REORDER_LINK',
                    data: { index, to: index + 1 },
                  })
              : undefined
          }
          onRemove={() => dispatch({ type: 'REMOVE_LINK', data: { index } })}
        />
      ))}

      <p style={{ marginTop: '0.5rem' }}>
        <button
          className="button--primary"
          onClick={() => dispatch({ type: 'ADD_LINK' })}
        >
          Add link
        </button>
      </p>
    </div>
  );
};

export default LinksSettings;
