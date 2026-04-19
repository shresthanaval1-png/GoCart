{/* 🔥 TOGGLES */}
<div className="flex gap-4 text-sm mt-2">

    <label className="flex items-center gap-2">
        <input
            type="checkbox"
            checked={newCoupon.forNewUser}
            onChange={(e) =>
                setNewCoupon({
                    ...newCoupon,
                    forNewUser: e.target.checked
                })
            }
        />
        <span>New User</span>
    </label>

    <label className="flex items-center gap-2">
        <input
            type="checkbox"
            checked={newCoupon.forMember}
            onChange={(e) =>
                setNewCoupon({
                    ...newCoupon,
                    forMember: e.target.checked
                })
            }
        />
        <span>Member</span>
    </label>

</div>