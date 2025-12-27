--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4
-- Dumped by pg_dump version 16.4

-- Started on 2025-12-27 09:28:11

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace xmloption= '';

SET default_table_access_method = heap;

--
-- TOC entry 221 (class 1259 OID 19706)
-- Name: gear_equipment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gear_equipment (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    serial_no character varying(100),
    purchase_date date,
    warranty_date date,
    location character varying(100),
    department character varying(100),
    employee character varying(100),
    team_id integer,
    technician_id integer,
    request_count integer DEFAULT 0
);


ALTER TABLE public.gear_equipment OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 19705)
-- Name: gear_equipment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.gear_equipment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.gear_equipment_id_seq OWNER TO postgres;

--
-- TOC entry 4911 (class 0 OID 0)
-- Dependencies: 220
-- Name: gear_equipment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.gear_equipment_id_seq OWNED BY public.gear_equipment.id;


--
-- TOC entry 227 (class 1259 OID 19765)
-- Name: gear_part; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gear_part (
    id integer NOT NULL,
    work_order_id integer,
    code character varying(50),
    tag character varying(50),
    alt_manufacturer character varying(100),
    cost_per_part double precision,
    quantity integer,
    total_cost double precision,
    oem_target double precision
);


ALTER TABLE public.gear_part OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 19764)
-- Name: gear_part_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.gear_part_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.gear_part_id_seq OWNER TO postgres;

--
-- TOC entry 4912 (class 0 OID 0)
-- Dependencies: 226
-- Name: gear_part_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.gear_part_id_seq OWNED BY public.gear_part.id;


--
-- TOC entry 223 (class 1259 OID 19726)
-- Name: gear_request; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gear_request (
    id integer NOT NULL,
    subject character varying(255) NOT NULL,
    request_type character varying(20),
    equipment_id integer NOT NULL,
    team_id integer,
    technician_id integer,
    scheduled_date date,
    duration double precision,
    stage character varying(20),
    is_overdue boolean DEFAULT false,
    CONSTRAINT gear_request_request_type_check CHECK (((request_type)::text = ANY ((ARRAY['corrective'::character varying, 'preventive'::character varying])::text[]))),
    CONSTRAINT gear_request_stage_check CHECK (((stage)::text = ANY ((ARRAY['new'::character varying, 'in_progress'::character varying, 'repaired'::character varying, 'scrap'::character varying])::text[])))
);


ALTER TABLE public.gear_request OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 19725)
-- Name: gear_request_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.gear_request_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.gear_request_id_seq OWNER TO postgres;

--
-- TOC entry 4913 (class 0 OID 0)
-- Dependencies: 222
-- Name: gear_request_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.gear_request_id_seq OWNED BY public.gear_request.id;


--
-- TOC entry 218 (class 1259 OID 19684)
-- Name: gear_team; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gear_team (
    id integer NOT NULL,
    name character varying(100) NOT NULL
);


ALTER TABLE public.gear_team OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 19683)
-- Name: gear_team_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.gear_team_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.gear_team_id_seq OWNER TO postgres;

--
-- TOC entry 4914 (class 0 OID 0)
-- Dependencies: 217
-- Name: gear_team_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.gear_team_id_seq OWNED BY public.gear_team.id;


--
-- TOC entry 219 (class 1259 OID 19690)
-- Name: gear_team_members; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gear_team_members (
    team_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.gear_team_members OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 19751)
-- Name: gear_test_activity; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gear_test_activity (
    id integer NOT NULL,
    model_info character varying(100),
    unit_number character varying(50),
    technician_id integer,
    test_date date,
    test_results text
);


ALTER TABLE public.gear_test_activity OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 19750)
-- Name: gear_test_activity_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.gear_test_activity_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.gear_test_activity_id_seq OWNER TO postgres;

--
-- TOC entry 4915 (class 0 OID 0)
-- Dependencies: 224
-- Name: gear_test_activity_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.gear_test_activity_id_seq OWNED BY public.gear_test_activity.id;


--
-- TOC entry 216 (class 1259 OID 19677)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(150),
    role character varying(50)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 19676)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 4916 (class 0 OID 0)
-- Dependencies: 215
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4719 (class 2604 OID 19709)
-- Name: gear_equipment id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gear_equipment ALTER COLUMN id SET DEFAULT nextval('public.gear_equipment_id_seq'::regclass);


--
-- TOC entry 4724 (class 2604 OID 19768)
-- Name: gear_part id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gear_part ALTER COLUMN id SET DEFAULT nextval('public.gear_part_id_seq'::regclass);


--
-- TOC entry 4721 (class 2604 OID 19729)
-- Name: gear_request id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gear_request ALTER COLUMN id SET DEFAULT nextval('public.gear_request_id_seq'::regclass);


--
-- TOC entry 4718 (class 2604 OID 19687)
-- Name: gear_team id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gear_team ALTER COLUMN id SET DEFAULT nextval('public.gear_team_id_seq'::regclass);


--
-- TOC entry 4723 (class 2604 OID 19754)
-- Name: gear_test_activity id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gear_test_activity ALTER COLUMN id SET DEFAULT nextval('public.gear_test_activity_id_seq'::regclass);


--
-- TOC entry 4717 (class 2604 OID 19680)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 4899 (class 0 OID 19706)
-- Dependencies: 221
-- Data for Name: gear_equipment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gear_equipment (id, name, serial_no, purchase_date, warranty_date, location, department, employee, team_id, technician_id, request_count) FROM stdin;
1	CNC Machine A1	CNC-2024-001	2022-05-10	2025-05-10	Plant Floor	Production	\N	2	3	2
2	Printer 01	PRT-2023-112	2023-01-15	2024-01-15	Admin Office	Administration	\N	1	1	1
3	Laptop HR-01	LTP-2022-550	2022-03-20	2025-03-20	HR Cabin	HR	Priya	1	2	1
4	Air Compressor X2	CMP-2021-777	2021-08-01	2024-08-01	Workshop	Maintenance	\N	3	5	0
\.


--
-- TOC entry 4905 (class 0 OID 19765)
-- Dependencies: 227
-- Data for Name: gear_part; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gear_part (id, work_order_id, code, tag, alt_manufacturer, cost_per_part, quantity, total_cost, oem_target) FROM stdin;
1	1	BLT-100	Bolt	ABC Metals	10	10	100	85
2	2	BRG-220	Bearing	XYZ Bearings	50	2	100	90
3	3	OIL-500	Lubricant Oil	LubriTech	25	4	100	80
4	4	FAN-300	Cooling Fan	CoolAir	75	1	75	88
\.


--
-- TOC entry 4901 (class 0 OID 19726)
-- Dependencies: 223
-- Data for Name: gear_request; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gear_request (id, subject, request_type, equipment_id, team_id, technician_id, scheduled_date, duration, stage, is_overdue) FROM stdin;
1	Printer not printing	corrective	2	1	1	\N	1.5	repaired	f
2	CNC Machine vibration issue	corrective	1	2	3	\N	3	in_progress	f
3	Monthly CNC Checkup	preventive	1	2	4	2025-01-10	\N	new	t
4	Laptop slow performance	corrective	3	1	2	\N	0.5	repaired	f
5	Air Compressor Routine Check	preventive	4	3	5	2025-02-01	\N	new	f
\.


--
-- TOC entry 4896 (class 0 OID 19684)
-- Dependencies: 218
-- Data for Name: gear_team; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gear_team (id, name) FROM stdin;
1	IT Support Team
2	Mechanical Team
3	Electrical Team
\.


--
-- TOC entry 4897 (class 0 OID 19690)
-- Dependencies: 219
-- Data for Name: gear_team_members; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gear_team_members (team_id, user_id) FROM stdin;
1	1
1	2
2	3
2	4
3	5
3	6
\.


--
-- TOC entry 4903 (class 0 OID 19751)
-- Dependencies: 225
-- Data for Name: gear_test_activity; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gear_test_activity (id, model_info, unit_number, technician_id, test_date, test_results) FROM stdin;
1	CNC Model A1	UNIT-001	3	2025-01-05	All parameters normal
2	Printer Model HP-112	UNIT-PRT-01	1	2025-01-03	Paper feed test passed
3	Laptop Dell 5500	UNIT-LTP-01	2	2025-01-04	RAM and SSD tests passed
4	Air Compressor X2	UNIT-CMP-02	5	2025-01-06	Pressure stable, no leakage
\.


--
-- TOC entry 4894 (class 0 OID 19677)
-- Dependencies: 216
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, role) FROM stdin;
1	Mehul Patel	mehul.patel@example.com	Technician
2	Priya Sharma	priya.sharma@example.com	Technician
3	Ravi Kumar	ravi.kumar@example.com	Technician
4	Arjun Singh	arjun.singh@example.com	Technician
5	Suresh Verma	suresh.verma@example.com	Technician
6	Anita Desai	anita.desai@example.com	Technician
\.


--
-- TOC entry 4917 (class 0 OID 0)
-- Dependencies: 220
-- Name: gear_equipment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gear_equipment_id_seq', 4, true);


--
-- TOC entry 4918 (class 0 OID 0)
-- Dependencies: 226
-- Name: gear_part_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gear_part_id_seq', 4, true);


--
-- TOC entry 4919 (class 0 OID 0)
-- Dependencies: 222
-- Name: gear_request_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gear_request_id_seq', 5, true);


--
-- TOC entry 4920 (class 0 OID 0)
-- Dependencies: 217
-- Name: gear_team_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gear_team_id_seq', 3, true);


--
-- TOC entry 4921 (class 0 OID 0)
-- Dependencies: 224
-- Name: gear_test_activity_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gear_test_activity_id_seq', 4, true);


--
-- TOC entry 4922 (class 0 OID 0)
-- Dependencies: 215
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 6, true);


--
-- TOC entry 4734 (class 2606 OID 19714)
-- Name: gear_equipment gear_equipment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gear_equipment
    ADD CONSTRAINT gear_equipment_pkey PRIMARY KEY (id);


--
-- TOC entry 4740 (class 2606 OID 19770)
-- Name: gear_part gear_part_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gear_part
    ADD CONSTRAINT gear_part_pkey PRIMARY KEY (id);


--
-- TOC entry 4736 (class 2606 OID 19734)
-- Name: gear_request gear_request_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gear_request
    ADD CONSTRAINT gear_request_pkey PRIMARY KEY (id);


--
-- TOC entry 4732 (class 2606 OID 19694)
-- Name: gear_team_members gear_team_members_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gear_team_members
    ADD CONSTRAINT gear_team_members_pkey PRIMARY KEY (team_id, user_id);


--
-- TOC entry 4730 (class 2606 OID 19689)
-- Name: gear_team gear_team_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gear_team
    ADD CONSTRAINT gear_team_pkey PRIMARY KEY (id);


--
-- TOC entry 4738 (class 2606 OID 19758)
-- Name: gear_test_activity gear_test_activity_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gear_test_activity
    ADD CONSTRAINT gear_test_activity_pkey PRIMARY KEY (id);


--
-- TOC entry 4728 (class 2606 OID 19682)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4743 (class 2606 OID 19715)
-- Name: gear_equipment gear_equipment_team_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gear_equipment
    ADD CONSTRAINT gear_equipment_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.gear_team(id);


--
-- TOC entry 4744 (class 2606 OID 19720)
-- Name: gear_equipment gear_equipment_technician_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gear_equipment
    ADD CONSTRAINT gear_equipment_technician_id_fkey FOREIGN KEY (technician_id) REFERENCES public.users(id);


--
-- TOC entry 4749 (class 2606 OID 19771)
-- Name: gear_part gear_part_work_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gear_part
    ADD CONSTRAINT gear_part_work_order_id_fkey FOREIGN KEY (work_order_id) REFERENCES public.gear_request(id);


--
-- TOC entry 4745 (class 2606 OID 19735)
-- Name: gear_request gear_request_equipment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gear_request
    ADD CONSTRAINT gear_request_equipment_id_fkey FOREIGN KEY (equipment_id) REFERENCES public.gear_equipment(id);


--
-- TOC entry 4746 (class 2606 OID 19740)
-- Name: gear_request gear_request_team_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gear_request
    ADD CONSTRAINT gear_request_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.gear_team(id);


--
-- TOC entry 4747 (class 2606 OID 19745)
-- Name: gear_request gear_request_technician_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gear_request
    ADD CONSTRAINT gear_request_technician_id_fkey FOREIGN KEY (technician_id) REFERENCES public.users(id);


--
-- TOC entry 4741 (class 2606 OID 19695)
-- Name: gear_team_members gear_team_members_team_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gear_team_members
    ADD CONSTRAINT gear_team_members_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.gear_team(id);


--
-- TOC entry 4742 (class 2606 OID 19700)
-- Name: gear_team_members gear_team_members_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gear_team_members
    ADD CONSTRAINT gear_team_members_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 4748 (class 2606 OID 19759)
-- Name: gear_test_activity gear_test_activity_technician_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gear_test_activity
    ADD CONSTRAINT gear_test_activity_technician_id_fkey FOREIGN KEY (technician_id) REFERENCES public.users(id);


-- Completed on 2025-12-27 09:28:11

--
-- PostgreSQL database dump complete
--

