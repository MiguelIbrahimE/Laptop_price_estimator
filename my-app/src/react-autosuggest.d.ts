declare module 'react-autosuggest' {
    import * as React from 'react';
  
    interface AutosuggestProps {
      suggestions: any[];
      onSuggestionsFetchRequested: (request: { value: string }) => void;
      onSuggestionsClearRequested: () => void;
      getSuggestionValue: (suggestion: any) => string;
      renderSuggestion: (suggestion: any) => React.ReactNode;
      inputProps: any;
    }
  
    export default class Autosuggest extends React.Component<AutosuggestProps> {}
  }
  