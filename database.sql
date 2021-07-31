CREATE  TABLE "public".book ( 
	book_id              serial  NOT NULL ,
	book_codigo          integer  NOT NULL ,
	book_titulo          varchar(250)  NOT NULL ,
	book_autor           varchar(250)  NOT NULL ,
	book_anio            integer  NOT NULL ,
	book_editorial       varchar(150)  NOT NULL ,
	book_edicion         varchar(25)  NOT NULL ,
	book_isbn            varchar(25)  NOT NULL ,
	book_precio          decimal(8,4)  NOT NULL ,
	book_stock           integer  NOT NULL ,
	book_estado          varchar(15) DEFAULT 'Disponible'  ,
	created_at           timestamp DEFAULT current_timestamp  ,
	updated_at           timestamp   ,
	CONSTRAINT pk_book_book_id PRIMARY KEY ( book_id ),
	CONSTRAINT unq_book_codigo UNIQUE ( book_codigo ) 
 );

CREATE  TABLE "public".cliente ( 
	cliente_id           serial  NOT NULL ,
	cliente_tipo_dni     varchar(25)  NOT NULL ,
	cliente_dni          varchar(15)  NOT NULL ,
	cliente_apellido_paterno varchar(250)  NOT NULL ,
	cliente_apellido_materno varchar(250)  NOT NULL ,
	cliente_primer_nombre varchar(250)  NOT NULL ,
	cliente_segundo_nombre varchar(250) DEFAULT ''  ,
	cliente_telefono     varchar(15) DEFAULT '9999999999'  ,
	cliente_email        varchar(150) DEFAULT 'info@groupdeath.com'  ,
	cliente_estado       varchar(15) DEFAULT 'Activo'  ,
	created_at           timestamp DEFAULT current_timestamp  ,
	updated_at           timestamp   ,
	CONSTRAINT pk_cliente_cliente_id PRIMARY KEY ( cliente_id ),
	CONSTRAINT unq_cliente_dni UNIQUE ( cliente_dni ) 
 );

CREATE  TABLE "public".nota_alquiler ( 
	na_id                serial  NOT NULL ,
	na_anio              integer  NOT NULL ,
	na_mes               integer  NOT NULL ,
	na_dia               integer  NOT NULL ,
	na_codigo            varchar(100)  NOT NULL ,
	na_fecha_devolucion  varchar(50)  NOT NULL ,
	na_cliente           integer  NOT NULL ,
	na_observacion       varchar(200) DEFAULT ''  ,
	na_estado            varchar(15) DEFAULT 'Pendiente'  ,
	created_at           timestamp DEFAULT current_timestamp  ,
	updated_at           timestamp   ,
	CONSTRAINT pk_nota_alquiler_na_id PRIMARY KEY ( na_id ),
	CONSTRAINT unq_nota_alquiler_comprobante UNIQUE ( na_codigo ) ,
	CONSTRAINT fk_nota_alquiler_cliente FOREIGN KEY ( na_cliente ) REFERENCES "public".cliente( cliente_id )   
 );

CREATE  TABLE "public".nota_devolucion ( 
	nd_id                serial  NOT NULL ,
	nd_anio              integer  NOT NULL ,
	nd_mes               integer  NOT NULL ,
	nd_dia               integer  NOT NULL ,
	nd_codigo            varchar(100)  NOT NULL ,
	nd_cliente           integer  NOT NULL ,
	created_at           timestamp DEFAULT current_timestamp  ,
	updated_at           timestamp   ,
	CONSTRAINT pk_nota_devolucion_nd_id PRIMARY KEY ( nd_id ),
	CONSTRAINT unq_nota_devolucion_codigo UNIQUE ( nd_codigo ) ,
	CONSTRAINT fk_nota_devolucion_cliente FOREIGN KEY ( nd_cliente ) REFERENCES "public".cliente( cliente_id )   
 );

CREATE  TABLE "public".detalle_alquiler ( 
	dalq_book            integer  NOT NULL ,
	dalq_na              integer  NOT NULL ,
	dalq_cantidad        integer  NOT NULL ,
	dalq_observacion     varchar(250) DEFAULT ''  ,
	dalq_estado          varchar(15) DEFAULT 'Pendiente'  ,
	created_at           timestamp DEFAULT current_timestamp  ,
	updated_at           timestamp   ,
	CONSTRAINT pk_detalle_alquiler PRIMARY KEY ( dalq_book, dalq_na ),
	CONSTRAINT fk_detalle_alquiler_book FOREIGN KEY ( dalq_book ) REFERENCES "public".book( book_id )   ,
	CONSTRAINT fk_detalle_alquiler FOREIGN KEY ( dalq_na ) REFERENCES "public".nota_alquiler( na_id )   
 );

CREATE  TABLE "public".detalle_nota ( 
	dno_book             integer  NOT NULL ,
	dno_nota             integer  NOT NULL ,
	dno_cantidad         integer  NOT NULL ,
	dno_precio           decimal(8,4)  NOT NULL ,
	dno_observacion      varchar(200) DEFAULT ''  ,
	dno_adicional        decimal(8,4) DEFAULT 0  ,
	created_at           timestamp DEFAULT current_timestamp  ,
	updated_at           timestamp   ,
	CONSTRAINT pk_detalle_nota PRIMARY KEY ( dno_book, dno_nota ),
	CONSTRAINT fk_detalle_nota_book FOREIGN KEY ( dno_book ) REFERENCES "public".book( book_id )   ,
	CONSTRAINT fk_detalle_nota FOREIGN KEY ( dno_nota ) REFERENCES "public".nota_devolucion( nd_id )   
 );

