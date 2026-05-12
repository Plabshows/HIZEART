create table if not exists public.site_documents (
  key text primary key,
  content jsonb not null,
  updated_at timestamptz not null default now()
);

create or replace function public.set_site_documents_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists site_documents_updated_at on public.site_documents;
create trigger site_documents_updated_at
before update on public.site_documents
for each row
execute function public.set_site_documents_updated_at();

alter table public.site_documents enable row level security;

drop policy if exists "site_documents_public_select" on public.site_documents;
create policy "site_documents_public_select"
on public.site_documents
for select
using (true);

drop policy if exists "site_documents_admin_insert" on public.site_documents;
create policy "site_documents_admin_insert"
on public.site_documents
for insert
to authenticated
with check (auth.jwt() ->> 'email' = 'info@hizeart.com');

drop policy if exists "site_documents_admin_update" on public.site_documents;
create policy "site_documents_admin_update"
on public.site_documents
for update
to authenticated
using (auth.jwt() ->> 'email' = 'info@hizeart.com')
with check (auth.jwt() ->> 'email' = 'info@hizeart.com');

drop policy if exists "site_documents_admin_delete" on public.site_documents;
create policy "site_documents_admin_delete"
on public.site_documents
for delete
to authenticated
using (auth.jwt() ->> 'email' = 'info@hizeart.com');

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'hize-images',
  'hize-images',
  true,
  8388608,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "hize_images_public_select" on storage.objects;
create policy "hize_images_public_select"
on storage.objects
for select
using (bucket_id = 'hize-images');

drop policy if exists "hize_images_admin_insert" on storage.objects;
create policy "hize_images_admin_insert"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'hize-images'
  and auth.jwt() ->> 'email' = 'info@hizeart.com'
);

drop policy if exists "hize_images_admin_update" on storage.objects;
create policy "hize_images_admin_update"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'hize-images'
  and auth.jwt() ->> 'email' = 'info@hizeart.com'
)
with check (
  bucket_id = 'hize-images'
  and auth.jwt() ->> 'email' = 'info@hizeart.com'
);

drop policy if exists "hize_images_admin_delete" on storage.objects;
create policy "hize_images_admin_delete"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'hize-images'
  and auth.jwt() ->> 'email' = 'info@hizeart.com'
);
