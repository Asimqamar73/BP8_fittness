export const FINDING_OPTIONS = [
    { value: "pr", label: 'Poor' },
    { value: "fr", label: 'Fair' },
    { value: "gd", label: 'Good' },
    { value: "vg", label: 'Very good' },
    { value: "fn", label: 'Fine' },
    { value: "vf", label: 'Very Fine' },
    { value: "nm", label: 'Near Mint' },
];

export const FINDING_WITH_EMPTY_OPTIONS = [
    { value: "", label: "Please select" }, // EMPTY OPTION
    ...FINDING_OPTIONS
];

export const SUBMISSION_STATES = {
    1: "Waiting for receiving",
    2: "Processing",
    3: "In Review",
    4: "Reviewed",
    5: "Sent back"
}

export const OVERALL_NUMBER_GRADE_OPTIONS = [
    { value: 0.5, label: '0.5' },
    { value: 1.0, label: '1.0' },
    { value: 1.5, label: '1.5' },
    { value: 2.0, label: '2.0' },
    { value: 2.5, label: '2.5' },
    { value: 3.0, label: '3.0' },
    { value:3.5, label: '3.5' },
    { value:4.0, label: '4.0' },
    { value:4.5, label: '4.5' },
    { value:5.0, label: '5.0' },
    { value:5.5, label: '5.5' },
    { value:6.0, label: '6.0' },
    { value:6.5, label: '6.5' },
    { value:7.0, label: '7.0' },
    { value:7.5, label: '7.5' },
    { value:8.0, label: '8.0' },
    { value:8.5, label: '8.5' },
    { value:9.0, label: '9.0' },
    { value:9.2, label: '9.2' },
    { value:9.4, label: '9.4' },
    { value:9.6, label: '9.6' },
    { value:9.8, label: '9.8' },
    { value:10.0, label: '10.0' }
];

export const OVERALL_NUMBER_GRADE_WITH_EMPTY_OPTIONS = [
    { value: 0, label: "Please select" }, // EMPTY OPTION
    ...OVERALL_NUMBER_GRADE_OPTIONS
];

export const PUBLISHER_NAME_OPTIONS = [
    { value: 2, label: 'DC' },
    { value: 3, label: 'Marvel' },
    { value: 4, label: 'Image' },
    { value: 5, label: 'Studiocomix' },
    { value: 6, label: 'Lucha' },
    { value: 7, label: 'Boom! Studios' },
    { value: 8, label: 'Dark Horse Comics' },
    { value: 9, label: 'IDW' },
    { value: 1, label: 'Other (Please specify)' },
];

export const PUBLISHER_NAME_WITH_EMPTY_OPTIONS = [
    { value: 0, label: "Please select" }, // EMPTY OPTION
    ...PUBLISHER_NAME_OPTIONS
];

export const BP8_FITNESS_PERCENTAGE_GRADE_WITH_EMPTY_OPTIONS = [
    { value: 0, label: "Please select" }, // EMPTY OPTION
    { value:5, label: '5%' },
    { value:10, label: '10%' },
    { value:15, label: '15%' },
    { value:20, label: '20%' },
    { value:25, label: '25%' },
    { value:30, label: '30%' },
    { value:35, label: '35%' },
    { value:40, label: '40%' },
    { value:45, label: '45%' },
    { value:50, label: '50%' },
    { value:55, label: '55%' },
    { value:60, label: '60%' },
    { value:65, label: '65%' },
    { value:70, label: '70%' },
    { value:75, label: '75%' },
    { value:80, label: '80%' },
    { value:85, label: '85%' },
    { value:90, label: '90%' },
    { value:95, label: '95%' },
    { value:98, label: '98%' },
    { value:100, label: '100%' }
];

export const BP8_FITNESS_PERCENTAGE_GRADE_OPTIONS = [
    { value:5, label: '5%' },
    { value:10, label: '10%' },
    { value:15, label: '15%' },
    { value:20, label: '20%' },
    { value:25, label: '25%' },
    { value:30, label: '30%' },
    { value:35, label: '35%' },
    { value:40, label: '40%' },
    { value:45, label: '45%' },
    { value:50, label: '50%' },
    { value:55, label: '55%' },
    { value:60, label: '60%' },
    { value:65, label: '65%' },
    { value:70, label: '70%' },
    { value:75, label: '75%' },
    { value:80, label: '80%' },
    { value:85, label: '85%' },
    { value:90, label: '90%' },
    { value:95, label: '95%' },
    { value:98, label: '98%' },
    { value:100, label: '100%' }
];

export const HOW_DID_YOU_HEAR_ABOUT_US_OPTIONS = [
    { value: 5, label: 'Friend' },
    { value: 6, label: 'Social media' },
    { value: 7, label: 'Blog post article' },
    { value: 1, label: 'Other (Please specify)' },
];

export const HOW_DID_YOU_HEAR_ABOUT_US_WITH_EMPTY_OPTIONS = [
    { value: 0, label: "Please select" }, // EMPTY OPTION
    ...HOW_DID_YOU_HEAR_ABOUT_US_OPTIONS
];

export const ISSUE_COVER_YEAR_OPTIONS = [
    { value: 0, label: "Please select" }, // EMPTY OPTION
    { value: 1, label: 'I do not know' },
    { value: 2023, label: '2023' },
    { value: 2022, label: '2022' },
    { value: 2021, label: '2021' },
    { value: 2020, label: '2020' },
    { value: 2019, label: '2019' },
    { value: 2018, label: '2018' },
    { value: 2017, label: '2017' },
    { value: 2016, label: '2016' },
    { value: 2015, label: '2015' },
    { value: 2014, label: '2014' },
    { value: 2013, label: '2013' },
    { value: 2012, label: '2012' },
    { value: 2011, label: '2011' },
    { value: 2010, label: '2010' },
    { value: 2009, label: '2009' },
    { value: 2008, label: '2008' },
    { value: 2007, label: '2007' },
    { value: 2006, label: '2006' },
    { value: 2005, label: '2005' },
    { value: 2004, label: '2004' },
    { value: 2003, label: '2003' },
    { value: 2002, label: '2002' },
    { value: 2001, label: '2001' },
    { value: 2000, label: '2000' },
    { value: 1999, label: '1999' },
    { value: 1998, label: '1998' },
    { value: 1997, label: '1997' },
    { value: 1996, label: '1996' },
    { value: 1995, label: '1995' },
    { value: 1994, label: '1994' },
    { value: 1993, label: '1993' },
    { value: 1992, label: '1992' },
    { value: 1991, label: '1991' },
    { value: 1990, label: '1990' },
    { value: 1989, label: '1989' },
    { value: 1988, label: '1988' },
    { value: 1987, label: '1987' },
    { value: 1986, label: '1986' },
    { value: 1985, label: '1985' },
    { value: 1984, label: '1984' },
    { value: 1983, label: '1983' },
    { value: 1982, label: '1982' },
    { value: 1981, label: '1981' },
    { value: 1980, label: '1980' },
    { value: 1979, label: '1979' },
    { value: 1978, label: '1978' },
    { value: 1977, label: '1977' },
    { value: 1976, label: '1976' },
    { value: 1975, label: '1975' },
    { value: 1974, label: '1974' },
    { value: 1973, label: '1973' },
    { value: 1972, label: '1972' },
    { value: 1971, label: '1971' },
    { value: 1970, label: '1970' },
    { value: 1969, label: '1969' },
    { value: 1968, label: '1968' },
    { value: 1967, label: '1967' },
    { value: 1966, label: '1966' },
    { value: 1965, label: '1965' },
    { value: 1964, label: '1964' },
    { value: 1963, label: '1963' },
    { value: 1962, label: '1962' },
    { value: 1961, label: '1961' },
    { value: 1960, label: '1960' },
    { value: 1959, label: '1959' },
    { value: 1958, label: '1958' },
    { value: 1957, label: '1957' },
    { value: 1956, label: '1956' },
    { value: 1955, label: '1955' },
    { value: 1954, label: '1954' },
    { value: 1953, label: '1953' },
    { value: 1952, label: '1952' },
    { value: 1951, label: '1951' },
    { value: 1950, label: '1950' },
    { value: 1949, label: '1949' },
    { value: 1948, label: '1948' },
    { value: 1947, label: '1947' },
    { value: 1946, label: '1946' },
    { value: 1945, label: '1945' },
    { value: 1944, label: '1944' },
    { value: 1943, label: '1943' },
    { value: 1942, label: '1942' },
    { value: 1941, label: '1941' },
    { value: 1940, label: '1940' },
    { value: 1939, label: '1939' },
    { value: 1938, label: '1938' },
    { value: 1937, label: '1937' },
    { value: 1936, label: '1936' },
    { value: 1935, label: '1935' },
    { value: 1934, label: '1934' },
    { value: 1933, label: '1933' },
    { value: 1932, label: '1932' },
    { value: 1931, label: '1931' },
    { value: 1939, label: '1930' },
    { value: 1929, label: '1929' },
    { value: 1928, label: '1928' },
    { value: 1927, label: '1927' },
    { value: 1926, label: '1926' },
    { value: 1925, label: '1925' },
    { value: 1924, label: '1924' },
    { value: 1923, label: '1923' },
    { value: 1922, label: '1922' },
    { value: 1921, label: '1921' },
    { value: 1920, label: '1920' },
    { value: 1919, label: '1919' },
    { value: 1918, label: '1918' },
    { value: 1917, label: '1917' },
    { value: 1916, label: '1916' },
    { value: 1915, label: '1915' },
    { value: 1914, label: '1914' },
    { value: 1913, label: '1913' },
    { value: 1912, label: '1912' },
    { value: 1911, label: '1911' },
    { value: 1910, label: '1910' },
    { value: 1909, label: '1909' },
    { value: 1908, label: '1908' },
    { value: 1907, label: '1907' },
    { value: 1906, label: '1906' },
    { value: 1905, label: '1905' },
    { value: 1904, label: '1904' },
    { value: 1903, label: '1903' },
    { value: 1902, label: '1902' },
    { value: 1901, label: '1901' },
    { value: 1900, label: '1900' },
    { value: 2, label: '1899 or before' },
];

export const ISSUE_COVER_YEAR_WITH_EMPTY_OPTIONS = [
    { value: 0, label: "Please select" }, // EMPTY OPTION
    ...ISSUE_COVER_YEAR_OPTIONS
];

export const ISSUE_COVER_MONTH_OPTIONS = [
    { value: 1, label: "January"},
    { value: 2, label: "February"},
    { value: 3, label: "March"},
    { value: 4, label: "April"},
    { value: 5, label: "March"},
    { value: 6, label: "June"},
    { value: 7, label: "July"},
    { value: 8, label: "August"},
    { value: 9, label: "September"},
    { value: 10, label: "October"},
    { value: 11, label: "November"},
    { value: 12, label: "December"},
    { value: 13, label: "I don't know"},
];

export const ISSUE_COVER_MONTH_WITH_EMPTY_OPTIONS = [
    { value: 0, label: "Please select" }, // EMPTY OPTION
    ...ISSUE_COVER_MONTH_OPTIONS
];

export const MEMBER_STATUS_OPTIONS = [
    { value: 1, label: 'Active' },
    { value: 100, label: 'Archived' },
];

export const MEMBER_STATUS_WITH_EMPTY_OPTIONS = [
    { value: 0, label: "Please select" }, // EMPTY OPTION
    ...MEMBER_STATUS_OPTIONS
];

export const TRAINER_STATUS_OPTIONS = [
    { value: 1, label: 'Active' },
    { value: 100, label: 'Archived' },
];

export const TRAINER_STATUS_WITH_EMPTY_OPTIONS = [
    { value: 0, label: "Please select" }, // EMPTY OPTION
    ...TRAINER_STATUS_OPTIONS
];

export const DURATION_IN_MINUTES_OPTIONS = [
    { value: 5, label: '5 Minutes' },
    { value: 15, label: '15 Minutes' },
    { value: 30, label: '30 Minutes' },
    { value: 60, label: '60 Minutes' },
    { value: 120, label: '120 Minutes' },
];

export const DURATION_IN_MINUTES_WITH_EMPTY_OPTIONS = [
    { value: 0, label: "Please select" }, // EMPTY OPTION
    ...DURATION_IN_MINUTES_OPTIONS
];

export const ATENDEE_LIMIT_OPTIONS = [
    { value: 1, label: '1 Person' },
    { value: 2, label: '2 People' },
    { value: 3, label: '3 People' },
    { value: 4, label: '4 People' },
    { value: 5, label: '5 People' },
    { value: 6, label: '6 People' },
    { value: 7, label: '7 People' },
    { value: 8, label: '8 People' },
    { value: 9, label: '9 People' },
    { value: 10, label: '10 People' },
    { value: 11, label: '11 People' },
    { value: 12, label: '12 People' },
    { value: 13, label: '13 People' },
    { value: 14, label: '14 People' },
    { value: 15, label: '15 People' },
    { value: 16, label: '16 People' },
    { value: 17, label: '17 People' },
    { value: 18, label: '18 People' },
    { value: 19, label: '19 People' },
    { value: 20, label: '20 People' },
];

export const ATTENDEE_LIMIT_WITH_EMPTY_OPTIONS = [
    { value: 0, label: "Please select" }, // EMPTY OPTION
    ...ATENDEE_LIMIT_OPTIONS
];

export const SELF_CANCEL_MINIMUM_HOUR_OPTIONS = [
    { value: 1, label: '1 Hour before Session' },
    { value: 2, label: '2 Hours before Session' },
    { value: 3, label: '3 Hours before Session' },
    { value: 3, label: '4 Hours before Session' },
    { value: 3, label: '5 Hours before Session' },
];

export const SELF_CANCEL_MINIMUM_HOUR_OPTIONS_WITH_EMPTY_OPTIONS = [
    { value: 0, label: "Please select" }, // EMPTY OPTION
    ...SELF_CANCEL_MINIMUM_HOUR_OPTIONS
];

export const PAGE_SIZE_OPTIONS = [
    { value: 2, label: '2 Rows' },
    { value: 5, label: '5 Rows' },
    { value: 10, label: '10 Rows' },
    { value: 25, label: '25 Rows' },
    { value: 50, label: '50 Rows' },
    { value: 100, label: '100 Rows' },
    { value: 250, label: '250 Rows' },
];

export const STATUS_OPTIONS = [
    { value: 1, label: "Pending", color: "warning" },
    { value: 2, label: "Active", color: "success" },
    { value: 3, label: "Error", color: "danger" },
    { value: 4, label: "Cancelled", color: "danger" },
    { value: 5, label: "Archived", color: "dark" },
  ];

export const PAYMENT_OPTIONS = [
    { value: "Credit Card", label: "Credit Card" },
    { value: "Debit Card", label: "Debit Card" },
    { value: "PayPal", label: "PayPal" },
    { value: "Bank Transfer", label: "Bank Transfer" },
    { value: "Cash", label: "Cash" },
    { value: "Mobile Payment", label: "Mobile Payment" },
  ];