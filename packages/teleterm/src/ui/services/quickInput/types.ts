type SuggestionBase<T, R> = {
  kind: T;
  token: string;
  data: R;
};

export type SuggestionCmd = SuggestionBase<
  'suggestion.cmd',
  { name: string; displayName: string; description: string }
>;

export type SuggestionSshLogin = SuggestionBase<'suggestion.ssh-login', null>;

export type QuickInputPicker = {
  onPick(suggestion: Suggestion): void;
  getAutocompleteResult(input: string, startIndex: number): AutocompleteResult;
};

export type Suggestion = SuggestionCmd | SuggestionSshLogin;

export type AutocompleteToken = {
  value: string;
  startIndex: number;
};

type AutocompleteBase<T> = {
  kind: T;
};

export type AutocompletePartialMatch =
  AutocompleteBase<'autocomplete.partial-match'> & {
    suggestions: Suggestion[];
    targetToken: AutocompleteToken;
  };

export type AutocompleteNoMatch = AutocompleteBase<'autocomplete.no-match'>;

export type AutocompleteResult = AutocompletePartialMatch | AutocompleteNoMatch;
