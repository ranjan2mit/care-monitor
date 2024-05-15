CREATE TABLE public.patients (
	id uuid NOT NULL,
	patient_id varchar NULL,
	orgid varchar NULL,
	createdat timestamp NULL,
	clinical_data json NULL,
	analyze_data json NULL,
	CONSTRAINT patient_pk PRIMARY KEY (id)
);
