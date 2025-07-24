
import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Typography from '@mui/material/Typography';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const MultiSelectWithSearch = ({ options, value, onChange, placeholder }) => {
  const selectAllOption = { id: 'all', label: 'Select All' };

  const selectedOptions = options.filter(option => value.includes(option.id));

  const allSelected = options.length > 0 && value.length === options.length;

  const handleChange = (event, newValue) => {
    console.log(newValue)
    const isSelectAllClicked = newValue.some(item => item.id === selectAllOption.id);
    const allSelected = options.length > 0 && value.length === options.length;
    console.log(allSelected, "allSelected", isSelectAllClicked, "isSelectAllClicked");
    // 
    if (allSelected && !isSelectAllClicked) {
      if (isSelectAllClicked) {
        onChange(options.map(option => option.id));

      } else {
        onChange([])

      }
    }
    else if (isSelectAllClicked) {
      onChange(options.map(option => option.id));
    }
    else {
      onChange(newValue.filter(item => item.id !== selectAllOption.id).map(item => item.id));
    }
  };

  // Options with select all at the top
  const optionsWithSelectAll = [selectAllOption, ...options];

  return (
    <Autocomplete
      multiple
      options={optionsWithSelectAll}
      disableCloseOnSelect
      getOptionLabel={(option) => option.label || option}
      value={allSelected ? [selectAllOption, ...selectedOptions] : selectedOptions}
      onChange={handleChange}
      sx={{
        '& .MuiAutocomplete-root': {
          height: '42px !important', // Set the height of the input field
        },
        '& .MuiAutocomplete-inputRoot': {
          height: '42px !important', // Ensure input root has height
        },
        '& .MuiAutocomplete-listbox': {
          maxHeight: '150px !important', // Set the max height for the dropdown
          overflowY: 'auto !important', // Add vertical scrolling to the dropdown
        },
        '& .MuiAutocomplete-popupIndicator': {
          height: '42px !important', // Align the height of the dropdown indicator
        },
        '& .MuiAutocomplete-clearIndicator': {
          height: '42px !important', // Clear button also needs to be aligned
        },
        '& .MuiAutocomplete-input': {
          padding: 0,
        }
      }}


      renderOption={(props, option, { selected }) => {
        if (option.id === selectAllOption.id) {
          return (
            <li {...props} key={option.id}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={allSelected}
              />
              {option.label}
            </li>
          );
        }
        return (
          <li {...props} key={option.id}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.label}
          </li>
        );
      }}
      // renderTags={(tagValue, getTagProps) =>
      //   tagValue
      //     .filter((option) => option.id !== selectAllOption.id)
      //     .map((option, index) => (
      //      <div
      //     style={{
      //       display: 'flex',
      //       flexWrap: 'nowrap', // Ensure chips do not wrap to a new line
      //       overflowX: 'auto', // Enable horizontal scrolling
      //       gap: '4px', // Spacing between chips
      //       maxHeight: '32px', // Ensure the tags don't exceed the height
      //     }}

      //         key={option.id || option}

      //       >
      //         <Chip
      //           variant="outlined"
      //           label={option.label || option}
      //           {...getTagProps({ index })}
      //           onDelete={() => {
      //             const newValue = tagValue.filter((item) => item.id !== option.id).map(item => item.id);
      //             onChange(newValue);
      //           }}
      //         />
      //       </div>

      //     ))
      // }
      renderTags={(tagValue, getTagProps) => (
        <Typography
          sx={{
            display: 'flex',
            flexWrap: 'nowrap', 
            overflowX: 'auto', 
            gap: '4px', 
            maxHeight: '32px', 
            paddingBottom: '4px',
            marginBottom: '4px',
            '&::-webkit-scrollbar': {
              display: 'none', 
            },
            scrollbarWidth: 'none', 
          }}

        >
          {tagValue
            .filter((option) => option.id !== selectAllOption.id)
            .map((option, index) => (
              <Chip
                key={option.id || option}
                variant="outlined"
                label={option.label || option}
                {...getTagProps({ index })}
                onDelete={() => {
                  const newValue = tagValue.filter((item) => item.id !== option.id).map(item => item.id);
                  onChange(newValue);
                }}
              />
            ))}
        </Typography>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          placeholder={value?.length > 0 ? '' : placeholder}
          label={null}
          sx={{
            '& .MuiInputBase-input': {
              display: 'flex !important',
              alignItems: 'center !important',
              height: '100% !important',
              padding: 0, lineHeight: 'normal !important',
            },
            '& .MuiInputBase-root': {
              padding: 0,
              height: '42px !important',
            },
            '& .MuiInputBase-input::placeholder': {
              display: 'flex !important',
              alignItems: 'center !important',
              height: '100% !important',
            },
            '& .MuiAutocomplete-input': {
              padding: '   0 !important',
            }
          }}

        />
      )}
    />
  );
};

export default MultiSelectWithSearch;
