const Filters = ({
  search,
  setSearch,
  category,
  setCategory,
  sort,
  setSort
}) => {

  return (
    <div className='flex flex-col md:flex-row gap-4 mb-8'>

      <input
        type='text'
        placeholder='Search Products'
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className='border p-3 rounded w-full'
      />

      <select
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
        className='border p-3 rounded'
      >

        <option value=''>
          All Categories
        </option>

        <option value='Electronics'>
          Electronics
        </option>

        <option value='Clothing'>
          Clothing
        </option>

        <option value='Books'>
          Books
        </option>

      </select>

      <select
        value={sort}
        onChange={(e) =>
          setSort(e.target.value)
        }
        className='border p-3 rounded'
      >

        <option value=''>
          Sort
        </option>

        <option value='asc'>
          Price Low To High
        </option>

        <option value='desc'>
          Price High To Low
        </option>

      </select>

    </div>
  );
};

export default Filters;