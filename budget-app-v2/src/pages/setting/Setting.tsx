import { Button, PageSection, PostLoginLayout } from '$components';
import { ITEM_TYPES } from '$interfaces';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authReducer';
import { AppDispatch } from 'store/store';
import { resetExpenses } from '../../store/expensesReducer';

const Setting = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleLogout = useCallback(() => {
    dispatch(logout());
    dispatch(resetExpenses());
  }, []);
  return (
    <PostLoginLayout title="Settings">
      <PageSection>
        <Button
          name="Logout"
          type={ITEM_TYPES.SECONDARY}
          onClick={handleLogout}
        />
      </PageSection>
    </PostLoginLayout>
  );
};

export default Setting;
