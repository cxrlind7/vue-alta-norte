-- ============================================================
-- Tabla: cotizaciones
-- Ejecutar en: Supabase → SQL Editor
-- ============================================================

CREATE TABLE IF NOT EXISTS cotizaciones (
  id               UUID         DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at       TIMESTAMPTZ  DEFAULT now() NOT NULL,

  -- Cliente
  cliente_nombre   TEXT         NOT NULL,
  cliente_apellido TEXT         NOT NULL DEFAULT '',
  cliente_telefono TEXT         NOT NULL,
  cliente_email    TEXT         NOT NULL DEFAULT '',

  -- Lote
  seccion          TEXT         NOT NULL,
  lote_num         INTEGER      NOT NULL,
  superficie       NUMERIC(12,2),
  precio_por_m2    NUMERIC(14,2),

  -- Borrado lógico
  activo           BOOLEAN      NOT NULL DEFAULT true,

  -- Financiamiento
  precio_total     NUMERIC(14,2),
  enganche_pct     INTEGER,
  enganche_amt     NUMERIC(14,2),
  saldo            NUMERIC(14,2),
  plazo_meses      INTEGER,
  pago_mensual     NUMERIC(12,2)
);

-- ============================================================
-- Unicidad: un teléfono y un correo = una sola cotización
-- ============================================================

-- Un número de teléfono por cotización
CREATE UNIQUE INDEX IF NOT EXISTS cotizaciones_telefono_uniq
  ON cotizaciones (cliente_telefono);

-- Un correo por cotización (solo si no está vacío)
CREATE UNIQUE INDEX IF NOT EXISTS cotizaciones_email_uniq
  ON cotizaciones (cliente_email)
  WHERE cliente_email IS NOT NULL AND cliente_email <> '';

-- ============================================================
-- Row Level Security
-- ============================================================

ALTER TABLE cotizaciones ENABLE ROW LEVEL SECURITY;

-- Visitantes (anon) pueden INSERTAR cotizaciones
CREATE POLICY "cotizaciones_insert_anon"
  ON cotizaciones FOR INSERT TO anon
  WITH CHECK (true);

-- Solo admins (authenticated) pueden LEER todas las cotizaciones
CREATE POLICY "cotizaciones_select_auth"
  ON cotizaciones FOR SELECT TO authenticated
  USING (true);

-- Solo admins pueden ACTUALIZAR (borrado lógico)
CREATE POLICY "cotizaciones_update_auth"
  ON cotizaciones FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);

-- Solo admins pueden ELIMINAR permanentemente
CREATE POLICY "cotizaciones_delete_auth"
  ON cotizaciones FOR DELETE TO authenticated
  USING (true);

-- ============================================================
-- Índices para el panel de admin
-- ============================================================

CREATE INDEX IF NOT EXISTS cotizaciones_created_idx   ON cotizaciones (created_at DESC);
CREATE INDEX IF NOT EXISTS cotizaciones_seccion_idx   ON cotizaciones (seccion, lote_num);

-- ============================================================
-- Migraciones (si la tabla ya existe):
-- ALTER TABLE cotizaciones ADD COLUMN IF NOT EXISTS cliente_email    TEXT    NOT NULL DEFAULT '';
-- ALTER TABLE cotizaciones ADD COLUMN IF NOT EXISTS cliente_apellido TEXT    NOT NULL DEFAULT '';
-- ALTER TABLE cotizaciones ADD COLUMN IF NOT EXISTS activo           BOOLEAN NOT NULL DEFAULT true;
-- ============================================================
