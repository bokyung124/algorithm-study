-- Algorithm Study - Supabase 테이블 스키마
-- Supabase SQL Editor에서 실행하세요

-- 메모 테이블
create table public.memos (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  category_id text not null,
  pattern_id  text not null,
  content     text not null default '',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),

  unique(user_id, category_id, pattern_id)
);

-- 인덱스
create index idx_memos_user_id on public.memos(user_id);
create index idx_memos_user_category on public.memos(user_id, category_id);

-- Row Level Security
alter table public.memos enable row level security;

create policy "Users can read own memos"
  on public.memos for select
  using (auth.uid() = user_id);

create policy "Users can insert own memos"
  on public.memos for insert
  with check (auth.uid() = user_id);

create policy "Users can update own memos"
  on public.memos for update
  using (auth.uid() = user_id);

create policy "Users can delete own memos"
  on public.memos for delete
  using (auth.uid() = user_id);

-- updated_at 자동 갱신 트리거
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger memos_updated_at
  before update on public.memos
  for each row execute function update_updated_at();
